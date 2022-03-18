require("dotenv").config();
const mongoose = require("mongoose");
const Person = require("./models/Person");

const connectionString = process.env.CONNECTION_STRING;

const connectToDb = async () => {
  await mongoose.connect(connectionString);
};

connectToDb()
  .then((res) => {
    console.log("connected");
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
  });

/* Person.find({}).then((persons) => {
  persons.forEach((person) => {
    console.log(`${person.name}, ${person.number}`);
  });
  mongoose.connection.close();
}); */

/* person
  .save()
  .then((res) => {
    console.log(`Added ${res.name} to the phonebook`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
    mongoose.connection.close();
  }); */
