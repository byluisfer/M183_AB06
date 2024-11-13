const express = require("express");
const http = require("http");
const { initializeAPI } = require("./api");
const pino = require("pino-http");

// Create the express server
const app = express();
app.use(pino());
const server = http.createServer(app);

// deliver static files from the client folder like css, js, images
app.use(express.static("client"));
// route for the homepage
app.get("/", (req, res) => {
  req.log.info("Homepage accessed");
  res.sendFile(__dirname + "/client/index.html");
});

// Initialize the REST api
initializeAPI(app);

//start the web server
const serverPort = 3000;
server.listen(serverPort, () => {
  console.log(`Express Server started on port ${serverPort}`);
});