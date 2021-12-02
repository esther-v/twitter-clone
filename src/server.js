const express = require('express');
require('dotenv').config();
const ejs = require('ejs');
const cookieParser = require('cookie-parser');

const router = require("./routers");

const server = express();

server.engine("ejs", ejs.renderFile);
server.set("views", "./src/views");
server.use(express.static("./src/static"));

server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());

server.use(router);

server.listen(8080, () => {
    console.log("Server running at port 8080");
})