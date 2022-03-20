const errorHandler = (err, req, res, next) => {
  console.log(err);

  if (err.name === "CastError") {
    res.status(400).send({ err });
  }
  next();
};

module.exports = errorHandler;
