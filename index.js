const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/Person");
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

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => res.json(person))
    .catch((err) => console.error(`Error: ${err}`));
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  Person.findByIdAndDelete(id)
    .then((person) => {
      console.log(`Deleted ${person?.name}`);
      res.status(204).end();
    })
    .catch((err) => console.error(`Error: ${err}`));
});

app.post("/api/persons", morgan(":object"), (req, res) => {
  const id = Math.round(Math.random() * 999999);
  const { name, number } = req.body;

  //filters
  if (!name || !number)
    return res.status(400).json({ err: "Body content Missing" });

  let alreadyExist = false;
  persons.forEach((person) => {
    if (person.name === name) {
      alreadyExist = true;
    }
  });

  if (alreadyExist) {
    return res.status(400).json({ err: `Name Must Be Unique` });
  }
  console.log(id, name, number);

  //Add person to persons
  const person = {
    id,
    name,
    number,
  };

  persons = persons.concat(person);
  res.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API Running on Port ${PORT}`));
