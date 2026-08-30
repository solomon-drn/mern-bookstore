import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Toast from "../components/Toast";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const saveBook = () => {
    setLoading(true);
    setToast(null);
    const data = { title, author, publishYear };
    api
      .post("/books/create", data)
      .then(() => {
        setLoading(false);
        navigate("/", {
          state: {
            toast: {
              message: "Book created successfully",
              type: "success",
            },
          },
        });
      })
      .catch((error) => {
        setLoading(false);
        setToast({
          message: "Failed to create book. Please try again.",
          type: "error",
        });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading && <Spinner />}
      {toast && <Toast message={toast.message} type={toast.type} />}
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
          <Button onClick={saveBook}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;
