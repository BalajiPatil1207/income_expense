const errorHandler = (error) => {
  if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError"
  ) {
    const errors = error.errors.map(err => err.message);
    return {
      status: 422,
      error: errors
    };
  }
  if (error.name === "SequelizeDatabaseError") {
    return {
      status: 422,
      error: "Database Error"
    };
  }
  return {
    status: 500,
    error: "Internal Server Error"
  };
};

module.exports = errorHandler;