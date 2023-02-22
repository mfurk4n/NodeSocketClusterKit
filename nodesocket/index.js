const dotenv = require("dotenv");
dotenv.config({ path: __dirname + '/.env' });

const port = process.env.PORT || 3000;
const express = require("express");
require("./db/dbConnection");
const helmet = require("helmet");
const router = require("./routers/roomRoute");

const app = express();
app.use(helmet());
app.use(express.json());

app.use(router);

const server = require('http').createServer(app);

server.listen(port, (err) => {
  if (err) throw new Error(err);
  console.log('Server Dinleniyor: ', port);
});

module.exports.io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

require("./socket");
