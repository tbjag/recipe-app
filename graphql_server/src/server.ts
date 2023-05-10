// import { createServer } from 'node:http'
// import { createYoga } from 'graphql-yoga'
import { schema } from "./schema";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const port = Number(process.env.API_PORT) || 4000;

// const yoga = createYoga({ schema })

// const server = createServer(yoga)

// server.listen(port, () => {
//   console.info('Server is running on http://localhost:3000/graphql')
// })

const server = new ApolloServer({
  schema,
});

startStandaloneServer(server, { listen: { port: port } }).then((t) => {
  console.log(`🚀  Server ready at: ${t.url}`);
});
