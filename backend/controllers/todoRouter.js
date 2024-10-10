const express = require('express');
const Todo =require('../model/Todo')
const router = express.Router();

router.post("/addTodo", async (req, res) => {
    try {
        // Destructure `text` and `completed` from the request body
        const { text, completed } = req.body;

        // Basic validation to ensure both fields are provided
        if (!text || completed === undefined) {
            return res.status(400).json({ message: 'Both text and completed fields are required' });
        }

        // Create a new Todo document using the provided data
        const newTodo = new Todo({ text, completed });

        // Save the new todo in the database
        await newTodo.save();

        // Respond with a success message
        res.status(201).json({ message: 'Todo created successfully', newTodo });
    } catch (error) {
        console.error('Error creating todo:', error.message);

        // Send an error response in case of failure
        res.status(500).json({ message: 'Failed to create todo', error: error.message });
    }

});

router.get('/getTodo',async(req,res)=>{
    try{
        const todo=await Todo.find();
        res.status(201).json(todo);
    }catch(err){
       console.error('unable to fetch the data!!')
    }
})

router.delete('/deleteTodo/:id',async(req,res)=>{
    try{
        const todo=await Todo.findByIdAndDelete(req.params.id);
        res.status(201).json({message:'Todo item deleted successfully'},todo);
    }catch(err){
       console.error('unable to delelte the data!!',err)
    }
});

router.put('/updateTodo',async()=>{
    try{
        const todo=await Todo.findByIdAndUpdate(req.params.id);
        res.status(201).json({message:'Todo item updated successfully'},todo);
    }catch(err){
       console.error('unable to update the data!!',err)
    }
})

module.exports = router;
