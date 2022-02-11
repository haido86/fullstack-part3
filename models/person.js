const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

// console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: [true, "User phone number required"],
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{5}/.test(v) || /\d{2}-\d{6}/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! right format are xx-xxxxxx or xxx-xxxxx`,
    },
    required: [true, "User phone number required"],
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
