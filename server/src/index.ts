import Fastify from 'fastify';
import cors from '@fastify/cors';
import { pool } from './db';

const fastify = Fastify();
fastify.register(cors, { origin: true });

fastify.get('/api/hello', async (_, reply) => {
  try {
    const result = await pool.query('SELECT $1::text as message', ['Hello from PostgreSQL!']);
    reply.send({ message: result.rows[0].message });
    // reply.send({ message: 'Hello from Fastify!' });
  } catch (err) {
    console.error(err);
    reply.status(500).send({ error: 'Database error' });
  }
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  console.log(`Server running at ${address}`);
});