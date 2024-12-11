"use strict";
const data = [
  {
    id: "B1",
    name: "Chocolate Bar",
    rrp: "22.40",
    info: "Delicious overpriced chocolate.",
  },
];
export default async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    return data;
  });
  fastify.post("/", async function (request, reply) {
    fastify.mockDataInsert(request, opts.prefix.slice(1), data);
    return data;
  });
}
