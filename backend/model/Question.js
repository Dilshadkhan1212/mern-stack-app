const { type } = require('express/lib/response')
const mongoose=require('mongoose')

const newQuestionSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    interest:{
        type:[String],
        required:true
    }
})
const Question=new mongoose.model('Question',newQuestionSchema);

module.exports=Question;