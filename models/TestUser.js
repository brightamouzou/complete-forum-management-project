const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const adminSchema = mongoose.Schema({
  username: { type: String, minLength: 3, unique: true },
  password: { type: String, minLength: 4 },
});

adminSchema.plugin(uniqueValidator);

module.exports = mongoose.model("TestUser", adminSchema);
