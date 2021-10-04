exports.get404 = (req, res, next) => {
    const error = new Error("Route not found.");
    error.statusCode = 404;
    res.json({
        status: `Error!`,
        payload: {
            message: error.message,
            statusCode: error.statusCode
        }
    })
};

exports.get500 = (error, req, res, next) => {
  res.status(error.statusCode === null || undefined ? 500 : error.statusCode).json({
    status: `Error!`,
    payload: {
        message: error.message,
        statusCode: error.statusCode
    }
  });
};