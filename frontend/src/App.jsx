import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditBook from "./pages/EditBook";
import CreateBook from "./pages/CreateBook";
import Showbook from "./pages/ShowBook";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/details/:id" element={<Showbook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
      </Routes>
    </>
  );
};

export default App;
