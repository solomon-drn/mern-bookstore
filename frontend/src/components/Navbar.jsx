import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-sky-800 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        BookStore
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-sky-200">
          Books
        </Link>

        <Link to="/books/create" className="hover:text-sky-200">
          Add Book
        </Link>

        {user ? (
          <>
            <span>Welcome, {user.username}</span>

            <button
              onClick={logout}
              className="hover:text-sky-200"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:text-sky-200">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;