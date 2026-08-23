import { Book } from "../models/book.model.js";

export const createBook = async (request, response, next) => {
  try {
    const { title, author, publishYear } = request.body;

    if (!title?.trim() || !author?.trim() || !publishYear) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const year = Number(publishYear);

    const newBook = {
      title: title.trim(),
      author: author.trim(),
      publishYear: year,
    };

    const book = await Book.create(newBook);

    return response.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

export const getAllBooks = async (request, response, next) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

export const getBook = async (request, response, next) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    if (!book) {
      return response.status(404).json({
        message: "Book not found",
      });
    }
    return response.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { title, author, publishYear } = request.body;

    if (Object.keys(request.body).length === 0) {
      return response.status(400).json({
        message: "No data provided for update",
      });
    }

    const updateData = {};

    if (title !== undefined) {
      if (!title.trim()) {
        return response.status(400).json({
          message: "Title cannot be empty",
        });
      }
      updateData.title = title.trim();
    }

    if (author !== undefined) {
      if (!author.trim()) {
        return response.status(400).json({
          message: "Author cannot be empty",
        });
      }
      updateData.author = author.trim();
    }

    if (publishYear !== undefined) {
      const year = Number(publishYear);

      if (!Number.isInteger(year)) {
        return response.status(400).json({
          message: "Publish year must be a number",
        });
      }
      updateData.publishYear = year;
    }

    const book = await Book.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return response.status(404).json({
        message: "Book not found",
      });
    }

    return response.status(200).json({
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (request, response, next) => {
  try {
    const { id } = request.params;

    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return response.status(404).json({
        message: "Book not found",
      });
    }
    return response.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
