const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    lastName: String,
    email: String,
    birthdate: Date // Format MM/dd/yyyy
  },
  {timestamps: true}//Add creation date and modification
  );

  module.exports = mongoose.model('users', userSchema);