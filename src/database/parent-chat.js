const mongoose = require("mongoose");

const Stats = mongoose.Schema({
  sunucuid: String,
  kulid: String,
  kanalid: String,
  gunluk: { type: Number, default: 0 },
  haftalik: { type: Number, default: 0 },
  aylik: { type: Number, default: 0 }
});

module.exports = mongoose.model("UyeChatParent", Stats);