const mongoose = require("mongoose");
const connection = require("../database")

const MessageSchema = mongoose.Schema({
  message: {
    text: {
      type: String,
      required: true
    },
  },
  users: Array,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = connection.model("Messages", MessageSchema);