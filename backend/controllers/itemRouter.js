const express = require('express');
const Item =require('../model/Item')
const router = express.Router();

router.post("/create", async (req, res) => {

    const newItem=new Item( { name: req.body.name});
    await newItem.save();
  
  res.status(201).json({ message: 'Item created successfully', newItem });
});

// Route to fetch all users
router.get('/items', async (req, res) => {
    try {
      const items = await Item.find();  // Fetch all users from MongoDB
      res.json(items);  // Return users as JSON
      console.log('items:',items)
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  });

  // route to delete
  router.delete('/items/:id', async (req, res) => {
    try {
        
        const item=await Item.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
  });


  // route for update item
  router.put('/items/:id', async (req, res) => {
     try{
        const {id}=req.params.id;
        const updateData=req.body;
       const updateItem=await Item.findByIdAndUpdate(id,updateData);
       res.status(200).json({ message: 'Item updated successfully' });
     }catch(error){
        res.status(500).json({ message: 'Server error', error });
     }
  })

module.exports =router