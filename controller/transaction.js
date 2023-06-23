const TransactionService = require("../service/transaction");
const Transaction=require('../models/transaction');

const makeTransaction = async (req, res) => {
  
        req.body.userID=req.user._id;
        const {
          mode,
          country,
          currency,
          userID,
          from,
          to,
          value
        } = req.body;
      
        const newTransaction = new Transaction({
          mode,
          country,
          currency,
          userID,
          from,
          to,
          value
        });
      
        newTransaction.save()
          .then(transaction => {
            res.status(201).json(transaction);
          })
          .catch(error => {
            res.status(500).json({ error: 'An error occurred while creating the transaction.' });
          });
     
}

const getWithdrawTransaction = async (req, res) => {
    const transactionId = req.params.id;
  
    Transaction.findByIdAndRemove(transactionId)
      .then(deletedTransaction => {
        if (deletedTransaction) {
          res.json({ message: 'Transaction deleted successfully.' });
        } else {
          res.status(404).json({ error: 'Transaction not found.' });
        }
      })
      .catch(error => {
        res.status(500).json({ error: 'An error occurred while deleting the transaction.' });
      });
 
}

const getDepositTransaction = async (req, res) => {
  
    const transactionId = req.params.id;
    const signedTransaction = req.body.signedTransaction;
  
    Transaction.findByIdAndUpdate(transactionId, { signedTransaction: signedTransaction, status:'signed'}, { new: true })
      .then(updatedTransaction => {
        if (updatedTransaction) {
          res.json(updatedTransaction);
        } else {
          res.status(404).json({ error: 'Transaction not found.' });
        }
      })
      .catch(error => {
        res.status(500).json({ error: 'An error occurred while updating the transaction.' });
      });
}

const getTransactionByID = async (req, res) => {
  const transactionId = req.params.id;

  Transaction.findById(transactionId)
    .then(transaction => {
      if (transaction) {
        res.json(transaction);
      } else {
        res.status(404).json({ error: 'Transaction not found.' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred while retrieving the transaction.' });
    });
}


module.exports = {
 makeTransaction,
 getWithdrawTransaction,
 getDepositTransaction,
 getTransactionByID
}