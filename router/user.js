const UserController = require("../controller/user");
const authMiddleware = require("../middleware/auth");
const bodyParser = require('body-parser');
const passport=require('passport');
const express = require('express');



  userRouter = express.Router();
  
  userRouter.post("/login", UserController.logIn);

  userRouter.post("/signup", UserController.signUp);

  userRouter.patch("/profile", authMiddleware.verifyUser, UserController.updateProfile);


  module.exports=userRouter;

