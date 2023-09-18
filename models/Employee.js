const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "please enter your first name"],
    },
    lastName: {
      type: String,
      required: [true, "please enter your last name"],
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
    departement: {
      type: String,
      required: [true, "please enter your departement"],
    },
    attendance: [
      {
        checkIn: {
          type: Date,
          default: Date.now,
        },
        checkOut: {
          type: Date,
        },
        comment: {
          type: String,
          default: "",
        },
        time: {
          type: Number,
        },
      },
    ],
  },
  { collection: "users" }
);

const model = mongoose.model("EmployeeSchema", employeeSchema);

module.exports = model;
