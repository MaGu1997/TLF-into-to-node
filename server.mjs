"use strict";
import { createServer } from "node:http";

const data = JSON.stringify([
  {
    id: "A1",
    name: "Vacuum Cleaner",
    rrp: "99.99",
    info: "The most powerful vacuum in the world.",
  },
  {
    id: "A2",
    name: "Leaf Blower",
    rrp: "303.33",
    info: "This product will blow your socks off.",
  },
  {
    id: "B1",
    name: "Chocolate Bar",
    rrp: "22.40",
    info: "Delicious overpriced chocolate.",
  },
]);

const server = await createServer((req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Set Content-Type header to JSON
  res.writeHead(200, { "Content-Type": "application/json" });
  // Send data
  res.end(data);
});

server.listen(3000);
console.log("Server listening on port http://localhost:3000/");
