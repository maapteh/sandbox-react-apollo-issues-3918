import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** All available queries */
export type Query = {
   __typename?: 'Query';
  /** Have good example which directly passes the string */
  good: Maybe<Scalars['String']>;
  /** Have a bad query which actually throws an Apollo Error */
  bad: Maybe<Scalars['String']>;
};

export type BadQueryVariables = {};


export type BadQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'bad'>
);

export type GoodQueryVariables = {};


export type GoodQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'good'>
);


export const BadDocument = gql`
    query bad {
  bad
}
    `;
export type BadComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<BadQuery, BadQueryVariables>, 'query'>;

    export const BadComponent = (props: BadComponentProps) => (
      <ApolloReactComponents.Query<BadQuery, BadQueryVariables> query={BadDocument} {...props} />
    );
    
export type BadProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<BadQuery, BadQueryVariables>
    } & TChildProps;
export function withBad<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  BadQuery,
  BadQueryVariables,
  BadProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, BadQuery, BadQueryVariables, BadProps<TChildProps, TDataName>>(BadDocument, {
      alias: 'bad',
      ...operationOptions
    });
};

/**
 * __useBadQuery__
 *
 * To run a query within a React component, call `useBadQuery` and pass it any options that fit your needs.
 * When your component renders, `useBadQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBadQuery({
 *   variables: {
 *   },
 * });
 */
export function useBadQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<BadQuery, BadQueryVariables>) {
        return ApolloReactHooks.useQuery<BadQuery, BadQueryVariables>(BadDocument, baseOptions);
      }
export function useBadLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BadQuery, BadQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<BadQuery, BadQueryVariables>(BadDocument, baseOptions);
        }
export type BadQueryHookResult = ReturnType<typeof useBadQuery>;
export type BadLazyQueryHookResult = ReturnType<typeof useBadLazyQuery>;
export type BadQueryResult = ApolloReactCommon.QueryResult<BadQuery, BadQueryVariables>;
export const GoodDocument = gql`
    query good {
  good
}
    `;
export type GoodComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GoodQuery, GoodQueryVariables>, 'query'>;

    export const GoodComponent = (props: GoodComponentProps) => (
      <ApolloReactComponents.Query<GoodQuery, GoodQueryVariables> query={GoodDocument} {...props} />
    );
    
export type GoodProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GoodQuery, GoodQueryVariables>
    } & TChildProps;
export function withGood<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GoodQuery,
  GoodQueryVariables,
  GoodProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GoodQuery, GoodQueryVariables, GoodProps<TChildProps, TDataName>>(GoodDocument, {
      alias: 'good',
      ...operationOptions
    });
};

/**
 * __useGoodQuery__
 *
 * To run a query within a React component, call `useGoodQuery` and pass it any options that fit your needs.
 * When your component renders, `useGoodQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGoodQuery({
 *   variables: {
 *   },
 * });
 */
export function useGoodQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GoodQuery, GoodQueryVariables>) {
        return ApolloReactHooks.useQuery<GoodQuery, GoodQueryVariables>(GoodDocument, baseOptions);
      }
export function useGoodLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GoodQuery, GoodQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GoodQuery, GoodQueryVariables>(GoodDocument, baseOptions);
        }
export type GoodQueryHookResult = ReturnType<typeof useGoodQuery>;
export type GoodLazyQueryHookResult = ReturnType<typeof useGoodLazyQuery>;
export type GoodQueryResult = ApolloReactCommon.QueryResult<GoodQuery, GoodQueryVariables>;