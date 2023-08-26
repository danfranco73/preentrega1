const express = require("express");
const app = express();
const socket = require("socket.io");
const path = require("path"); // I need this to use the path.join method
const routerServer = require("./routes/index.router.js"); // for cleaner code
const port = 8080; // the port I'm using for my server
const logger = require("morgan"); // This shows me the requests in the console

const httpServer = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
const serverIo = socket(httpServer);

const handlebars = require("express-handlebars"); //  need this to use handlebars

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars"); 
app.set("views", path.join(__dirname, "views")); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); 
app.use(logger("dev")); // I use it to see the requests in the console

serverIo.on("connection", (socket) => {
  console.log("Client connected!");
  socket.on("disconnect", () => {
    console.log("Client disconnected!");
  });
  socket.on("newProduct", (data) => {
    serverIo.emit("sendProducts", data);
  });
  socket.on("deleteProduct", (id) => {
    serverIo.emit("deleteProduct", id);
  });
});

// recive th websockets from the client for delete product
serverIo.on("deleteProduct", (id) => {
  const productToDelete = data.find((product) => product.id === id);
  if (productToDelete) {
    data.splice(data.indexOf(productToDelete), 1);
  }
  updateList(data);
});


app.use('/',routerServer); // I use my routes from src/routes/index.js

