import React from 'react';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';

import { ApolloClient, ApolloProvider, ApolloLink, HttpLink, split } from '@apollo/client';
import { InMemoryCache } from '@apollo/client/cache';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { onError } from '@apollo/client/link/error';

import { version, name } from '../package.json';

const isBrowser = typeof window !== 'undefined';

const uri = isBrowser
    ? `${window.location.origin}/api/graphql`
    : process.env.GRAPHQL_ENDPOINT
    ? process.env.GRAPHQL_ENDPOINT
    : 'http://localhost:3000/api/graphql';

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
                            '@apollo/client/react/ssr'
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

function createApolloClient(initialState = {}) {
    const isClientSide = typeof window !== 'undefined';

    // Create the cache first, which we'll share across Apollo tooling.
    // This is an in-memory cache. Since we'll be calling `createClient` on
    // universally, the cache will survive until the HTTP request is
    // responded to (on the server) or for the whole of the user's visit (in
    // the browser)
    const cache = new InMemoryCache({
        // TODO: no fragments anymore
        possibleTypes: { }
    });

    // If we're in the browser, we'd have received initial state from the
    // server. Restore it, so the client app can continue with the same data.
    let currentCache;
    if (isClientSide) {
        currentCache = cache.restore(initialState);
    }

    return new ApolloClient({
        name,
        version,
        connectToDevTools: true,
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
                (operation: any) => operation.getContext().important === true,
                httpLink as any, // if the test is true -- debatch
                batchHttpLink as any, // otherwise, batching is fine
            ),
        ]),
        cache: currentCache || cache,
        defaultOptions: {
            query: {
                errorPolicy: 'all',
            },
            mutate: {
                errorPolicy: 'all',
            },
            watchQuery: {
                errorPolicy: 'all',
            },
        },
    });
}
