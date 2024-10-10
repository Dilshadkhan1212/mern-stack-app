const express = require('express');
const Question =require('../model/Question')
const router = express.Router();
const multer = require('multer');
const path = require('path');
const res = require('express/lib/response');

const upload = multer({ dest: 'uploads/' });

router.post('/register',upload.single('photo'),async(req,res)=>{
try{
    const { name, dob, country, state, interest } = req.body; 
    const photo = req.file ? req.file.path : null;
    console.log(req);
    const dateOfBirth = new Date(dob);
    const interests = JSON.parse(interest);
    const newQuestion = new Question({
        name,
        dob: dateOfBirth,
        country,
        state,
        interest: interests,
        photo,
      });
  
    await newQuestion.save();
    res.status(200).json({
        message: 'Registration successful',
      });
}catch(err){
console.log(err);
console.error('Error occurred while saving the data:', err);
    res.status(500).json({ error: 'An error occurred while registering' });
}
});


router.get('/list',async(req,res)=>{
    try{
        const questions = await Question.find();
        res.status(200).json(questions);
    }catch(err){
       res.status(500).error('unable to get list')
    }
})

router.delete('/list/:id',async(req,res)=>{
    try{
        const questions = await Question.findByIdAndDelete(req.params.id);
        res.status(200).json({msg:"Question successfully deleted"});
    }catch(err){
       res.status(500).error('unable to get list')
    }
})


module.exports =router