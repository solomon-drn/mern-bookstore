import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { createBook, deleteBook, getAllBooks, getBook, updateBook } from "../controllers/book.controller.js";

const router = express.Router();

router.post("/create", authenticateUser, createBook);
router.get("/", getAllBooks)
router.get("/:id", getBook)
router.patch("/:id", updateBook)
router.delete("/:id", deleteBook)

export default router;
