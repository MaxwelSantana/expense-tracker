// modules required for routing
const express = require('express');
const jwt = require('jsonwebtoken');
const DB = require('../config/db');
const router = express.Router();
const Transaction = require('../models/transactions');


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

/* GET incidents List page. READ */
router.get('/', requireAuth, (req, res, next) => {
  // find all incidents in the incidents collection
  Transaction.find((err, transactions) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.json(transactions);
    }
  });

});

// GET the Incident Details page in order to edit an existing Incident
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Transaction.findById(id, (err, transactionToEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.json(transactionToEdit);
    }
  });
});

// POST process the Incident Details page and create a new Incident - CREATE
router.post('/', async (req, res, next) => {
  //let currentDate = new Date();
  //let transactionDate = `${currentDate.getDate().toString().padStart(2, '0')}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getFullYear().toString().substr(-2)}`;

  let lastTransaction = await Transaction.findOne().sort({ $natural: -1 }).exec();
  let lastTransactionNumber = lastTransaction ? await Transaction.countDocuments() : 0;


  // Increment the last incident number and pad with leading zeros
  //let newTransactionNumber = (lastTransactionNumber + 1).toString().padStart(7, '0');

  let newTransaction = new Transaction({
    "Id": req.body.Id,
    "Category": req.body.Category,
    "Subcategory": req.body.Subcategory,
    "Quantity": req.body.Quantity,
    "Amount": req.body.Amount,
    "Description": req.body.Description,
    "Status": req.body.Status,
    "Date": req.body.Date
  });

  Transaction.create(newTransaction, (err, transaction) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.json(transaction);
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', requireAuth, (req, res, next) => {
  let id = req.params.id;
  Transaction.findById(id, (err, transaction) => {
    if (err) {
      console.log(err);
      res.end(err);
    }

    let updatedTransaction = Transaction({
        "Id": req.body.Id,
        "Category": req.body.Category,
        "Subcategory": req.body.Subcategory,
        "Quantity": req.body.Quantity,
        "Amount": req.body.Amount,
        "Description": req.body.Description,
        "Status": req.body.Status,
        "Date": req.body.Date
    });

    if (transaction.Status != updatedTransaction.Status) {
      const narrative = req.body.Narrative;
      const log = {
        User: req.user.displayName,
        From: transaction.Status,
        To: updatedTransaction.Status,
        Narrative: narrative,
        Date: new Date(),
      };
      let logHistory = transaction.LogHistory || [];
      logHistory.push(log);
      updatedTransaction.LogHistory = logHistory;

      if (updatedTransaction.Status == "Close") {
        updatedTransaction.ResolutionMessage = narrative;
      }
    }

    Transaction.updateOne({ _id: id }, updatedTransaction, {}, (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      }
      else {
        res.json(updatedTransaction);
      }
    });
  });
});

// GET - process the delete by user id
router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  Transaction.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.json(id);
    }
  });
});


module.exports = router;
