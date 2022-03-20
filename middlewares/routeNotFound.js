const routeNotFound = (req, res, next) => {
  res.status(404).send({ err: "not found" });
};

module.exports = routeNotFound;
