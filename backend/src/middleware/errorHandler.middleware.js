const errorHandler = (error, request, response, next) => {
    console.log(error.message);
    
    if (error.name === "CastError") {
        return response.status(400).json({
            message: "Invalid book ID"
        })
    }

  response.status(500).json({
    message: "Server error",
  });
};

export default errorHandler;
