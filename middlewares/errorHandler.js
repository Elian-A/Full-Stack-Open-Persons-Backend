const errorHandler = (err, req, res, next) => {
  console.log(err.name);

  if (err.name === "CastError") {
    res.status(400).send({ err });
  }

  if (err.name === "ValidationError") res.status(400).send({ err });
};

module.exports = errorHandler;
