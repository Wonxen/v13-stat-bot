const mongoose = require("mongoose");

const Stats = mongoose.Schema({
    sunucuid: String,
    kulid: String,
    xpdata: { type: Number, default: 0 }
  });

module.exports = mongoose.model("UyeXP", Stats);
