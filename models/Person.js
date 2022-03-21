const { Schema, model } = require("mongoose");

const personSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    validate: {
      validator: (name) => /\w+\s\w+$/i.test(name),
      message: (props) => `${props.value} is not a valid name`,
    },
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: (phoneNumber) => /\d{4}-\d{6}$/.test(phoneNumber),
      message: (props) => `${props.value}. is not a valid number`,
    },
  },
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
