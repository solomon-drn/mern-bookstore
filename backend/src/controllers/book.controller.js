import { Book } from "../models/book.model.js";

export const createBook = async (request, response, next) => {
  try {
    const { title, author, publishYear } = request.body;

    if (!title || !author || !publishYear) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const newBook = {
      title,
      author,
      publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    next(error);
  }
};

export const getAllBooks = async (request, response, next) => {
  try {
    const books = await Book.find({});
    response.status(200).json({
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

export const updateBook = async (request, response,next) => {
  try {
    if (Object.keys(request.body).length === 0)
      return response.status(400).json({
        message: "no data provided for update",
      });

    const { id } = request.params;

    const book = await Book.findByIdAndUpdate(id, request.body, {
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
    });
  } catch (error) {
    next(error)
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
    next(error)
  }
};
