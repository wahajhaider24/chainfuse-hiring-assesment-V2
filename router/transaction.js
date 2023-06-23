const TransactionController = require("../controller/transaction");
const authMiddleware = require("../middleware/auth");
const bodyParser = require('body-parser');
const Transaction= require('../models/transaction');
const passport=require('passport');
const express = require('express');
//metamask will sign transaction and save using following api

  transactionRouter=express.Router();
  transactionRouter.get("/:id", TransactionController.getTransactionByID);

  //deposit will depoiste signed trasaction and will be saved in db in signed field
 
  transactionRouter.patch('/:id', authMiddleware.verifyUser, TransactionController.getDepositTransaction);
  

  transactionRouter.delete("/:id",authMiddleware.verifyUser, TransactionController.getWithdrawTransaction);
  //deposit will depoiste signed trasaction and will be saved in db in signed field
 

  transactionRouter.post("/makeTransaction", authMiddleware.verifyUser, TransactionController.makeTransaction);

module.exports=transactionRouter;
