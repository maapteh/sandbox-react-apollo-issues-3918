import React from 'react';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ApolloLink, split } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';

import { toIdValue } from 'apollo-utilities';

import { version, name } from '../package.json';

const uri = process.env.GRAPHQL_ENDPOINT
    ? process.env.GRAPHQL_ENDPOINT
    : 'http://localhost:3000/api/graphql';

const cache: any = new InMemoryCache({
    cacheRedirects: {
        Query: {
            // Here we map the data we get in product list view with the one for detail view
            // see: https://www.apollographql.com/docs/react/features/performance.html
            getProduct: (_, args) =>
                toIdValue(
                    cache.config.dataIdFromObject({
                        __typename: 'Product',
                        id: args.id,
                    }),
                ),
        },
    },
    resultCaching: false,
});

const isBrowser = typeof window !== 'undefined';

const batchHttpLink = new BatchHttpLink({
    uri,
    credentials: 'include', // 'same-origin'
    headers: { batch: 'true ' },
    batchInterval: 10,
    ...(!isBrowser && { fetch }),
});

// link to use if not batching
const httpLink = new HttpLink({
    uri,
    credentials: 'include', // 'same-origin'
    ...(!isBrowser && { fetch }),
});

let apolloClient: any = null;

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent: any, { ssr = true } = {}) {
    const WithApollo = ({
        apolloClient,
        apolloState,
        ssrComplete,
        ...pageProps
    }: any) => {
        const client = apolloClient || initApolloClient(apolloState);

        return typeof window !== 'undefined' || (ssr && !ssrComplete) ? (
            <ApolloProvider client={client}>
                <PageComponent {...pageProps} />
            </ApolloProvider>
        ) : null;
    };

    // Set the correct displayName in development
    if (process.env.NODE_ENV !== 'production') {
        const displayName =
            PageComponent.displayName || PageComponent.name || 'Component';

        if (displayName === 'App') {
            console.warn('This withApollo HOC only works with PageComponents.');
        }

        WithApollo.displayName = `withApollo(${displayName})`;
    }

    if (ssr || PageComponent.getInitialProps) {
        WithApollo.getInitialProps = async (ctx: any) => {
            const { AppTree } = ctx;

            // Initialize ApolloClient, add it to the ctx object so
            // we can use it in `PageComponent.getInitialProp`.
            ctx.apolloClient = initApolloClient();

            // Run wrapped getInitialProps methods
            let pageProps = {};
            if (PageComponent.getInitialProps) {
                pageProps = await PageComponent.getInitialProps(ctx);
            }

            // Only on the server:
            if (typeof window === 'undefined') {
                // When redirecting, the response is finished.
                // No point in continuing to render
                if (ctx.res && ctx.res.finished) {
                    return pageProps;
                }

                // Only if ssr is enabled
                if (ssr) {
                    try {
                        // Run all GraphQL queries
                        const { getDataFromTree } = await import(
                            '@apollo/react-ssr'
                        );
                        await getDataFromTree(
                            <AppTree
                                pageProps={{
                                    ...pageProps,
                                    apolloClient: ctx.apolloClient,
                                }}
                            />,
                        );
                    } catch (error) {
                        // This error will not happen with config in line 205 below!!!
                        console.error(
                            `[GraphQL treewalker error] Error ${error.message}`,
                        );
                    }

                    // getDataFromTree does not call componentWillUnmount
                    // head side effect therefore need to be cleared manually
                    Head.rewind();
                }
            }

            // Extract query data from the Apollo store
            const apolloState = ctx.apolloClient.cache.extract();

            return {
                ...pageProps,
                apolloState,
                ssrComplete: true,
            };
        };
    }

    return WithApollo;
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState = undefined) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (typeof window === 'undefined') {
        return createApolloClient(initialState);
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = createApolloClient(initialState);
    }

    return apolloClient;
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState = {}) {
    return new ApolloClient({
        name,
        version,
        ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
        link: ApolloLink.from([
            onError(({ graphQLErrors, networkError }) => {
                if (graphQLErrors)
                    graphQLErrors.map(({ message, locations, path }) =>
                        console.log(
                            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                        ),
                    );
                if (networkError)
                    console.log(`[Network error]: ${networkError}`);
            }),
            split(
                (operation) => operation.getContext().important === true,
                httpLink as any, // if the test is true -- debatch
                batchHttpLink as any, // otherwise, batching is fine
            ),
        ]),
        cache: cache.restore(initialState),
        /* defaultOptions: {
            query: {
                errorPolicy: 'all',
            },
            mutate: {
                errorPolicy: 'all',
            },
            watchQuery: {
                errorPolicy: 'all',
            }
        }, */
    });
}
