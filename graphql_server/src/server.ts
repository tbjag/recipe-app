import { createServer } from 'node:http'
import { createYoga } from 'graphql-yoga'
import {schema} from './schema'

const port = Number(process.env.API_PORT) || 3000;

const yoga = createYoga({ schema })
 
const server = createServer(yoga)

server.listen(port, () => {
  console.info('Server is running on http://localhost:3000/graphql')
})

