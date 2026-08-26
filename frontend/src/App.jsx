import { useEffect, useState } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import Toast from "./components/Toast";
import Home from "./pages/Home";
import EditBook from "./pages/EditBook";
import CreateBook from "./pages/CreateBook";
import Showbook from "./pages/ShowBook";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

const App = () => {
  const [toast, setToast] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
  if (location.state?.toast) {
    setToast(location.state.toast);
  }
}, [location.state]);

  return (
    <>
      <Navbar />
      {toast && <Toast message={toast.message} type={toast.type} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/details/:id" element={<Showbook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
