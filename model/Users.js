const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
     // id: Date.now(),
     first_name: {
          type:String,
          required: [true, 'Please add a first_name']
     },
     last_name:{
          type: String,
          required: [true, 'Please add a first_name']
     },
     email: {
          type: String,
          match: [
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              'Please add a valid email',
          ]},
     password: {
          type: String,
          required: [true, 'Please password required'],
     }
},
{
     timestamps: true
});

module.exports = mongoose.model('User', UserSchema);