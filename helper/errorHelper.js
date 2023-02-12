const ErrorHandling = (err, req, res, next) => {
  res.status(500).json({
    success: false,
    status: 500,
    message: err.message,
  });
};

module.exports = ErrorHandling;
