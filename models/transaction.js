const mongoose = require("mongoose");

const schema = mongoose.Schema({
  mode: String,
  status: {type: String, default: "pending"},
  country: String,
  currency: String,
  amount: {type: Number, default: 0},
  userID: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  signedTransaction: { type: String, default: null},
  from: {
    type: String,
    require: true
  },
  to: {
    type: String,
    require: true
  },
  value:{
    type: String,
    //not required becuause only need to sign transaction
  },

  created: {type: Date, default: Date.now()}
});

module.exports = mongoose.model("Transaction", schema);
