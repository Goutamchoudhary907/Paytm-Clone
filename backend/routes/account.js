const express=require("express");
const { authMiddleware } = require("../middleware");
const { Account,User } = require("../db");
const { default: mongoose } = require("mongoose");

const router=express.Router();
router.get("/balance" , authMiddleware, async(req,res) =>{
    const user=await User.findOne({_id:req.userId})
    const account=await Account.findOne({
     userId:req.userId
    });
    if (!account) {
        return res.status(404).json({
            message: 'Account not found'
        });
    }
    res.json({
        balance:account.balance ,
        firstName:user.firstName,
        userId:user._id
    })
});

router.post("/transfer", authMiddleware,async (req,res) =>{
    const session =await mongoose.startSession();
    session.startTransaction();
    const {amount,to}=req.body;

    // fetch the accounts within the transaction
    const account=await Account.findOne({userId:req.userId}).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Insufficient balance"
        });
    }

    const toAccount=await Account.findOne({userId:to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid account"
        })
    }

    // perform the transfer
    await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);
    await Account.updateOne({userId:to}, {$inc:{balance:amount}}).session(session);

    // commit the transaction
    await session.commitTransaction();
    res.json({
        message:"Transfer successful"
    })
});

module.exports=router;


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Nzc4YTgxZjZiZmE2NmJkYjQxYzQ1NTYiLCJpYXQiOjE3MzU5NjA2MDd9.4BROoTkD0rZrPO6DuORFm0-hMZ6xhSjczHr9lNQNJhw       goutam123
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Nzc4YTg0ZDZiZmE2NmJkYjQxYzQ1NWIiLCJpYXQiOjE3MzU5NjA2NTN9.e08wFJuSayyvKoLOrUZvKSUzoyvdMldPlJJyBEcyJG0       ran987
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Nzc4YTg3ZTZiZmE2NmJkYjQxYzQ1NjAiLCJpYXQiOjE3MzU5NjA3MDJ9.E3R5_ikIGbjOAEtVjKkOOEuuUIHeVrB034ZOPo_mKAw       harkirat11