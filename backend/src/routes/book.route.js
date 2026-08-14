import express from "express";
import { createBook, deleteBook, getAllBooks, getBook, updateBook } from "../controllers/book.controller.js";

const router = express.Router();

router.post("/create", createBook);
router.get("/", getAllBooks)
router.get("/:id", getBook)
router.patch("/:id", updateBook)
router.delete("/:id", deleteBook)

export default router;
