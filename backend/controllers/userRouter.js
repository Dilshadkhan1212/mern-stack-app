const express = require('express');
const User =require('../model/User')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth=require('../middleware/auth');
const adminMiddleware=require('../middleware/adminMiddleware');

// Register route
router.post('/register',async(req,res)=>{
    try {
    const {name,email,password}=req.body;
    const existingUser=await User.findOne({email});
    console.log(' ..',existingUser)
    if(existingUser){ return res.status(400).json({ message: "User already exists" });}
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({name,email,password:hashedPassword});
    await user.save()
    res.status(200).send({message:'user successfully created',user});
    } catch (error) {
        res.status(500).json({ error: error.message });  
    }
    
})

// fetch route

router.get('/get',async(req,res)=>{
  try {
    const response=await User.find();
    res.status(201).send(response);
  } catch (error) {
    res.status(500).json({ error: error.message });  
  }
})

//Login Route
router.post('/login',async(req,res)=>{
    const {name,email,password}=req.body;
    try {
        // check user exists
        const user= await User.findOne({email});
        if(!user){ return res.status(400).json({ message: "User does not exist"});}

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // generate JWT
        const secretKey = process.env.JWT_SECRET || 'dilshad@123'; // Use env variable for production
        const token = jwt.sign({ id: user._id ,role: user.role}, secretKey, { expiresIn: '3h' });

        // Send the token in a cookie (or you can send it in the response body)
        // res.cookie('token', token, { httpOnly: true }).json({ message: "Login successful", token });
        res.status(200).json({ token }); 
    } catch (error) {
        res.status(500).json({ error: err.message }); 
    }
})

// Protected route
router.get('/dashboard', auth, (req, res) => {
    // res.json({ message: "This is a protected route" });
    res.json({ message: `Welcome, user with ID: ${req.user.id}` });
  });

// admin route
  router.get('/admin', [auth, adminMiddleware], (req, res) => {
    res.json({ message: 'Welcome, admin!' });
  });  

module.exports=router;