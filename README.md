# Sample application
> Show stacktrace when ssr error happens, and no error being passed to component but then called again client-side

## Pre-requisites

- `yarn`
- `yarn dev`
- goto `http://localhost:3000/`

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

## Setup

- [graphql server](./pages/api/graphql/index.ts) having a good and bad query
- [page](./pages/index.tsx) page showing the bug
- [bad component](./modules/bad/bad.tsx) component having the bug
- [apollo client](./lib/apollo.tsx#ln205) with this settings error will not be thrown, BUT also not passed to component!

So when i change the errorPolicy in the above apollo client, since i want to be able to use the error, i get the following stacktrace:

```
[client] render good
[client] render bad
[server] GraphQL server query: good
[server] GraphQL server query: bad
[GraphQL error]: Message: oeps, Location: [object Object], Path: bad
[GraphQL treewalker error] Error GraphQL error: oeps
[server] GraphQL server query: bad
```

Now you can see the treewalker throws the error (which i catch), but then client-side the call is done again... And that part should not happen but its unclear for me with what settings.
