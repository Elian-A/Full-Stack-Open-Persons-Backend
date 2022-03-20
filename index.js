const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/Person");
const errorHandler = require("./middlewares/errorHandler");
const routeNotFound = require("./middlewares/routeNotFound");
const app = express();

app.use(express.json());
app.use(cors());

app.use(morgan("tiny"));
morgan.token("object", (req) => JSON.stringify(req.body));

//DB
require("./mongo.js");

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/info", (req, res) => {
  const template = `
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>
  `;
  res.send(template);
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => res.json(person))
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;

  Person.findByIdAndDelete(id)
    .then((person) => {
      console.log(`Deleted ${person?.name}`);
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.post("/api/persons", morgan(":object"), (req, res, next) => {
  const id = Math.round(Math.random() * 999999);
  const { name, number } = req.body;

  //filters
  if (!name || !number)
    return res.status(400).json({ err: "Body content Missing" });

  let alreadyExist = false;
  Person.find({ name })
    .then((person) => (alreadyExist = true))
    .catch((err) => console.error(err));

  if (alreadyExist) {
    return res.status(400).json({ err: `Name Must Be Unique` });
  }
  console.log(id, name, number);

  Person.create({
    name,
    number,
  })
    .then((person) => res.json(person))
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  const { name, number } = req.body;
  Person.findByIdAndUpdate(
    id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((newPerson) => {
      console.log(newPerson);
      res.json(newPerson);
    })
    .catch((err) => next(err));
});

app.use(routeNotFound);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API Running on Port ${PORT}`));
