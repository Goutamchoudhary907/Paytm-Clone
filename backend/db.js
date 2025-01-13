const mongoose=require('mongoose');
require('dotenv').config();
main().catch(err => console.log(err))
 async function main(){

    const dbURI = process.env.MONGO_URI;
    mongoose.connect(dbURI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });
    
 }
 const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    password:{ 
        type:String,
        required:true,
        minLength:6
    }
});

 const accountSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",                             //reference to the User model
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
 });

const Account=mongoose.model('Account',accountSchema);
const User=mongoose.model('User',userSchema);
module.exports={
    User,
    Account
};