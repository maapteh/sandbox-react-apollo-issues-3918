import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  /** Have good example which directly passes the string */
  good: Maybe<Scalars['String']>;
  /** Have a bad query which actually throws an Apollo Error */
  bad: Maybe<Scalars['String']>;
  /**  test 401  */
  authenticationError: Maybe<Scalars['String']>;
};

export type BadQueryVariables = Exact<{ [key: string]: never; }>;


export type BadQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'bad'>
);

export type AuthenticationErrorQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthenticationErrorQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'authenticationError' | 'good'>
);

export type GoodQueryVariables = Exact<{ [key: string]: never; }>;


export type GoodQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'good'>
);


export const BadDocument = gql`
    query bad {
  bad
}
    `;

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
export const AuthenticationErrorDocument = gql`
    query authenticationError {
  authenticationError
  good
}
    `;

/**
 * __useAuthenticationErrorQuery__
 *
 * To run a query within a React component, call `useAuthenticationErrorQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthenticationErrorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthenticationErrorQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthenticationErrorQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AuthenticationErrorQuery, AuthenticationErrorQueryVariables>) {
        return ApolloReactHooks.useQuery<AuthenticationErrorQuery, AuthenticationErrorQueryVariables>(AuthenticationErrorDocument, baseOptions);
      }
export function useAuthenticationErrorLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AuthenticationErrorQuery, AuthenticationErrorQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AuthenticationErrorQuery, AuthenticationErrorQueryVariables>(AuthenticationErrorDocument, baseOptions);
        }
export type AuthenticationErrorQueryHookResult = ReturnType<typeof useAuthenticationErrorQuery>;
export type AuthenticationErrorLazyQueryHookResult = ReturnType<typeof useAuthenticationErrorLazyQuery>;
export type AuthenticationErrorQueryResult = ApolloReactCommon.QueryResult<AuthenticationErrorQuery, AuthenticationErrorQueryVariables>;
export const GoodDocument = gql`
    query good {
  good
}
    `;

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