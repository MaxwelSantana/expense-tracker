// modules required for routing
const express = require('express');
const jwt = require('jsonwebtoken');
const DB = require('../config/db');
const router = express.Router();
const Transaction = require('../models/transactions');
const Categories =  require('../models/categories')
let User = require('../models/user');



function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, DB.Secret, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

// GET the Incident Details page in order to edit an existing Incident
router.get('/getTransactions',requireAuth,async (req, res, next) => {
  try{
  let user = req.user;
  console.log("User:" , user);
  console.log("User ID", user.id);
  const userTransactions = await User.findById(user.id);
  
  console.log("User Transactions: " , userTransactions);
  const transactions = userTransactions.transactions;
  return res.json(transactions);
  //return res.status(200).json({success:true, message:"Transaction has been displayed", transactions})
  }
  catch(error){
    console.error('Error adding transaction to user:', error);

    return res.status(500).json({success:false, message:"Transaction has not been displayed"})
  }   
});

// POST process the Incident Details page and create a new Incident - CREATE
router.post('/newTransaction', requireAuth, async (req, res, next) => {
 
  console.log(req.body);
  let newTransaction = new Transaction({
    "id": req.body._id,
    "category": req.body.category,
    "subcategory": req.body.subcategory,
    "quantity": req.body.quantity,
    "amount": req.body.amount,
    "description": req.body.description,
    "status": req.body.status,
    "date": req.body.date
  });

  try {
    // Save the transaction to the database
    const savedTransaction = await newTransaction.save();
  
    // Find the user by ID
    const user = await User.findById(req.user.id);
  
    // Add the transaction ID to the user's transactions array
    user.transactions.push(savedTransaction); // Assuming transactions is an array of transaction IDs
  
    // Save the updated user object
    const updatedUser = await user.save();
  
    console.log('Transaction added to user:', savedTransaction);
    console.log('Updated User:', updatedUser);
return res.status(200).json({success:true, message:"Transaction added successfully"})

  } catch (error) {
    console.error('Error adding transaction to user:', error);

    return res.status(500).json({success:false, message:"Transaction added successfully"})
  }

});

// POST - process the information passed from the details form and update the document
router.patch('/editTransaction/:id', requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const transactionId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const transactionToUpdate = user.transactions.find(
      (transaction) => String(transaction._id) === transactionId
    );

    if (!transactionToUpdate) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Update transaction fields
    transactionToUpdate.category = req.body.category;
    transactionToUpdate.subcategory = req.body.subcategory;
    transactionToUpdate.quantity = req.body.quantity;
    transactionToUpdate.amount = req.body.amount;
    transactionToUpdate.description = req.body.description;
    transactionToUpdate.status = req.body.status;
    transactionToUpdate.date = req.body.date;

    await user.save(); // Save the updated user document

    res.json(transactionToUpdate); // Return the updated transaction

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});



// GET - process the delete by user id
router.delete('/deleteTransaction/:id',requireAuth, async (req, res, next) => {
  const userId = req.user.id; // Assuming you have access to the user's ID
  const transactionId = req.params.id;
  console.log("transactions ID", transactionId);

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const transactionIndex = user.transactions.findIndex(
      (transaction) => String(transaction._id) === transactionId
    );

    if (transactionIndex === -1) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    user.transactions.splice(transactionIndex, 1); // Remove the transaction from the array

    await user.save(); // Save the updated user object back to the database

    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/getCategories', requireAuth, async(req, res, next) =>{
  try{
    const categories = await Categories.find();
    res.json(categories);
  }  
  catch (err) {
    console.error(err);
    // Handle the error appropriately (e.g., send an error response)
    res.status(500).json({ error: 'An error occurred while fetching the list.' });
  }
})


module.exports = router;
