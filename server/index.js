import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';

import models from './models';

const SECRET = 'fenbvlqbl25r23qtq';
const SECRET2 = 'veaivguqbvaqbvqjb21j4b21jkbr13jkqbf2jq';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));

const graphqlEndpoint = '/graphql';

// Context to get models of sequelize to our resolvers
app.use(
  graphqlEndpoint, bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      models, user: { id: 1 }, SECRET, SECRET2,
    },
  }),
);

app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));

models.sequelize.sync().then(() => {
  app.listen(8080);
});

app.listen(8081);
