import { ApolloServer, gql, ApolloError, AuthenticationError } from 'apollo-server-micro';

const typeDefs = gql`
    type Query {
        good: String
        bad: String
        authenticationError: String
    }
`;

const resolvers = {
    Query: {
        good: () => {
            console.log('[server] GraphQL server query: good');
            return 'Hello Cheburashka';
        },
        bad: () => {
            console.log('[server] GraphQL server query: bad');
            return new ApolloError('oeps');
        },
        authenticationError: () => {
            throw new AuthenticationError('must authenticate');
        },
    },
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    debug: false,
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
