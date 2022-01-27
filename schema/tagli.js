const mongoose = require("mongoose");

const Stats = mongoose.Schema({
    sunucuid: String,
    kulid: String,
    sayi: { type: Number, default: 0 }
  });

module.exports = mongoose.model("UyeTagli", Stats);