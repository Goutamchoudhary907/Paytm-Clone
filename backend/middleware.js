const {JWT_SECRET} =require("./config")
const jwt=require("jsonwebtoken");

const authMiddleware= (req,res,next) => {
    const authHeader=req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(403).json({ message: 'Unauthorized: No token provided' });
    }
    const token=authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
    }
    try{
        const decoded=jwt.verify(token,JWT_SECRET);
        if(decoded.userId){
            req.userId=decoded.userId;
            next();
    }else{
        return res.status(403).json({message: 'userid not present'});
    }
    }catch(err){
        return res.status(403).json({message: 'Forbidden: Invalid token'});
    }
};

module.exports={
    authMiddleware
}