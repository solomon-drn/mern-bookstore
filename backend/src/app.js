import express from "express";

const app = express(); //create express application

//parse incoming JSON request bodies
app.use(express.json());

//import routers
import bookRouter from "./routes/book.route.js";

//route all /api/v1/books/ to the book-related routes
app.use("/api/v1/books", bookRouter);

export default app;
