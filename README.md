# Sample application
> Show stacktrace when ssr error happens, and no error being passed to component...

_Repo is created for [apollographql/react-apollo/issues/3918](https://github.com/apollographql/react-apollo/issues/3918) and [apollographql/apollo-client/issues/6612](https://github.com/apollographql/apollo-client/issues/6612), to show in [codesandbox.io](https://codesandbox.io/s/github/maapteh/sandbox-react-apollo-issues-3918) the bug which happens with client v2 and v3_

**moved version 2 client example to branch: apollo-client-2, all client versions have this behavior**

## Pre-requisites

- `yarn`

## File structure

- [graphql server](./pages/api/graphql/index.ts#L10) having a good and bad query resolved
- [page](./pages/index.tsx) page showing the bug happening
- [bad component](./modules/bad/bad.tsx) component having the bug
- [apollo client](./lib/apollo.tsx#L190) with this settings error will not be thrown, BUT also not passed to component!


## Development

- `yarn dev`
- goto [http://localhost:3000/](http://localhost:3000/) (playground at [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql))

Now you will see the following stack:

```
[client] render good
[client] render bad
[server] GraphQL server query: bad (query, once)
[server] GraphQL server query: good (query, once)
[GraphQL error]: Message: oeps, Location: [object Object], Path: bad
[client] render good (nextjs rendering again)
[client] render bad (nextjs rendering again)
```

Now the error is not passed to its component. When i change the errorPolicy in the above [apollo client](./lib/apollo.tsx#L190) not to 'all', since i want to be able to use the error, i get the following stacktrace:

```
[client] render good
[client] render bad
[server] GraphQL server query: good
[server] GraphQL server query: bad
[GraphQL error]: Message: oeps, Location: [object Object], Path: bad
[GraphQL treewalker error] Error GraphQL error: oeps
[server] GraphQL server query: bad
```

Now you can see the treewalker throws the error (which i catch), but then client-side the call is done again...
