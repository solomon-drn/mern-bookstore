const Toast = ({ message, type = "success" }) => {
  const styles = {
    success: "bg-green-600",
    error: "bg-red-600",
  };

  return (
    <div
      className={`fixed top-5 right-5 ${styles[type]} text-white px-6 py-3 rounded-lg shadow-lg`}
    >
      {message}
    </div>
  );
};

export default Toast;