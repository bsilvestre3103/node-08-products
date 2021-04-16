const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name required']
  },
  lastName: {
    type: String,
    required: [true, 'lastName required']
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
    index: true
  },
  birthdate: Date, // Format MM/dd/yyyy
  password: {
    type: String,
    required: [true, 'Password required']
  },
  role: {
    type: String,
    required: true,
    default: 'USER_ROLE',
    enum: ['USER_ROLE', 'ADMIN_ROLE']
  },
  enable: {
    type: Boolean,
    required: true,
    default: true
  }
},
  { timestamps: true }//Add creation date and modification
);

userSchema.plugin(uniqueValidator, {message: 'ya existe en la BD.'});

mongoosePaginate.paginate.options = {
  lean: true,
  //limit: 5,
  pagination: true

}
userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('users', userSchema);