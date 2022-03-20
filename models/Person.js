const { Schema, model } = require("mongoose");

const personSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
  },
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = model("Person", personSchema);

module.exports = Person;
