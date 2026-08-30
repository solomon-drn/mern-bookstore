import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    api
      .get(`/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError("Failed to load book. Please try again.");
        console.log(error);
      });
  }, [id]);

  const editBook = () => {
    setSaving(true);
    setError("");

    const data = { title, author, publishYear };

    api
      .patch(`/books/${id}`, data)
      .then(() => {
        setSaving(false);
        navigate("/", {
          state: {
            toast: {
              message: "Book updated successfully",
              type: "success",
            },
          },
        });
      })
      .catch((error) => {
        setSaving(false);
        setError("Failed to update book. Please try again.");
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <label htmlFor="title" className="text-xl mr-4 text-gray-500">
              Title
            </label>
            <input
              id="title"
              type="text"
              autoComplete="off"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label htmlFor="author" className="text-xl mr-4 text-gray-500">
              Author
            </label>
            <input
              id="author"
              type="text"
              autoComplete="off"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label htmlFor="publishYear" className="text-xl mr-4 text-gray-500">
              Publish Year
            </label>
            <input
              id="publishYear"
              type="number"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="flex justify-center">
            <Button disabled={saving} onClick={editBook}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBook;
