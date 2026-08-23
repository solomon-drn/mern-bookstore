import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-sky-800 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        BookStore
      </Link>

      <div className="flex gap-6">
        <Link to="/" className="hover:text-sky-200">
          Books
        </Link>

        <Link to="/books/create" className="hover:text-sky-200">
          Add Book
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;