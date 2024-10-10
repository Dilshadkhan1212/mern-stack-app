const jwt = require('jsonwebtoken');

const auth=(req,res,next)=>{
    try {
        console.log('req',req);
        const token = req.header('cookie')?.split('token=')[1];
        // const token=req.cookie.split('=')[1];
        console.log(token);
        if(!token) return res.status(401).json({msg:"No authentication token"});
        
        const verified=jwt.verify(token,'dilshad@123');
        console.log('ver',verified)
        req.user = verified;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
}

module.exports=auth;