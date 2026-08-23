import { Link } from "react-router";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

const BookCard = ({ book, index, onDelete }) => {
  return (
    <tr className="h-8">
      <td className="border border-slate-700 rounded-md text-center">
        {index + 1}
      </td>

      <td className="border border-slate-700 rounded-md text-center">
        {book.title}
      </td>

      <td className="border border-slate-700 rounded-md text-center max-md:hidden">
        {book.author}
      </td>

      <td className="border border-slate-700 rounded-md text-center max-md:hidden">
        {book.publishYear}
      </td>

      <td className="border border-slate-700 rounded-md text-center">
        <div className="flex justify-center gap-x-4">
          <Link to={`/books/details/${book._id}`}>
            <BsInfoCircle className="text-2xl text-green-800" />
          </Link>

          <Link to={`/books/edit/${book._id}`}>
            <AiOutlineEdit className="text-2xl text-yellow-600" />
          </Link>

          <button onClick={() => onDelete(book)}>
            <MdOutlineDelete className="text-2xl text-red-600" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BookCard;
