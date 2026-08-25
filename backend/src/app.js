import express from "express";
import bookRouter from "./routes/book.route.js"; //import routers
import cors from "cors"
import errorHandler from "./middleware/errorHandler.middleware.js";
import authRouter from "./routes/auth.route.js";

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

app.use("/api/v1/auth", authRouter);


//route all /api/v1/books/ to the book-related routes
app.use("/api/v1/books", bookRouter);
app.use(errorHandler)

export default app;
