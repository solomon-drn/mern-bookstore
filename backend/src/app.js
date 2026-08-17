import express from "express";
import bookRouter from "./routes/book.route.js"; //import routers
import cors from "cors"

const app = express(); //create express application

//allow cross-origin requests
app.use(cors())
// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PATCH", "DELETE"],
//     allowedHeaders: ["Content-Type"]
// }))

//parse incoming JSON request bodies
app.use(express.json());



//route all /api/v1/books/ to the book-related routes
app.use("/api/v1/books", bookRouter);

export default app;
