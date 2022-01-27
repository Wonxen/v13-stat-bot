const mongoose = require("mongoose");

const Stats = mongoose.Schema({
    userID: String,
    date: Number,
  });

module.exports = mongoose.model("Tarih", Stats);
