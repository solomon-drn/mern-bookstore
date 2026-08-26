const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}) => {
  const variants = {
    primary: "bg-sky-300",
    danger: "bg-red-600 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`p-2 w-full m-8 cursor-pointer ${variants[variant]} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
};

export default Button;
