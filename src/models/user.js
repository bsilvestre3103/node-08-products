import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id:  String, // String is shorthand for {type: String}
  name: String,
  lastName:   String,
  email: String,
  birthdate:  Date,
  hidden: Boolean,
  
},
{timestamps: true}
);

module.exports = mongoose.model ('users', userSchema);