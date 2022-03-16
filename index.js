const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

morgan.token("object", (req) => JSON.stringify(req.body));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const template = `
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>
  `;
  res.send(template);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!persons.filter((person) => person.id === id)) res.status(404).end();

  persons = persons.filter((person) => person.id !== id);
  console.log(persons);
  res.status(204).end();
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
