import { useEffect, useState } from "react";
import api from "../api";
import Spinner from "../components/Spinner";
import BookCard from "../components/BookCard";
import ConfirmDialog from "../components/ConfirmDialog";
import Toast from "../components/Toast";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    api
      .get("/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to load books. Please try again");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  const handleDeleteClick = (book) => {
    setSelectedBook(book);
    setShowDialog(true);
  };

  const deleteBook = () => {
    setDeleting(true);
    setError("");

    api
      .delete(`/books/${selectedBook._id}`)
      .then(() => {
        setBooks((currentBooks) =>
          currentBooks.filter((book) => book._id !== selectedBook._id),
        );

        setShowDialog(false);
        setSelectedBook(null);
        setDeleting(false);
        setToast({
          message: "Book deleted successfully",
          type: "success",
        });
      })
      .catch((error) => {
        setDeleting(false);
        setError("Failed to delete book. Please try again.");
        setToast({
          message: "Failed to delete book",
          type: "error",
        });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <div className="flex justify-center items-center">
        <h1 className="text-3xl my-8">Books</h1>
      </div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : books.length === 0 ? (
        <p className="text-center text-gray-500 my-8">
          No books found. Add your first book.
        </p>
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Author
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Publish Year
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book, index) => (
              <BookCard
                key={book._id}
                book={book}
                index={index}
                onDelete={handleDeleteClick}
              />
            ))}
          </tbody>
        </table>
      )}
      {showDialog && (
        <ConfirmDialog
          onConfirm={deleteBook}
          onCancel={() => {
            setShowDialog(false);
            setSelectedBook(null);
          }}
          loading={deleting}
        />
      )}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default Home;
