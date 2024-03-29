const mongoose=require('mongoose');
const {Schema}=mongoose;

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }, country: {
        type: String,
      },
      img: {
        type: String,
      },
      city: {
        type: String,
      },
      phone: {
        type: String,
      },
     
      isAdmin: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
);
module.exports = mongoose.model('User', userSchema);