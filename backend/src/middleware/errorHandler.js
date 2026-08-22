const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  response.status(500).json({
    message: "Server error",
  });
};

export default errorHandler;
