const mongoose=require('mongoose');
main().catch(err => console.log(err))
 async function main(){

    mongoose.connect("mongodb+srv://goutamchoudhary:Goutam907688@cluster0.6gf0e.mongodb.net/PaytmProject")
    console.log("Connected to db");
    
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