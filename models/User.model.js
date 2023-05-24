// models/User.model.js

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    // aqui vão as propriedades
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    todos: {
      type: [Schema.Types.ObjectId],
      ref: "Todo",
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
