

const fastify = require('fastify')({ logger: true });
fastify.register(require("fastify-sensible"));
fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "..", "public"),
  prefix: "/"
});

// Declare a route
fastify.get('/api/get-feed', async (request, reply) => {
  try {
    reply.send({ feed: true });
  } catch (err) {
    reply.internalServerError("Unable to fetch WOD RSS feed");
  }
});

fastify.get('/api/*', (request, reply) => {
  reply.send({ hello: 'world' });
});

// Run the server!
fastify.listen(3001, err => {
  if (err) throw err;
})
