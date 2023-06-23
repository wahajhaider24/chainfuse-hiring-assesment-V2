var createError = require('http-errors');

const cors = require("cors");
const express = require("express");
const userRouter = require("./router/user");
const transactionRouter = require("./router/transaction");
const path = require('path');

const mongoose = require('mongoose');
const config= require('./config');


require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, '/')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'index.html'));
});

app.use("/users", userRouter);
app.use("/transaction", transactionRouter);
const connect = mongoose.connect(config.mongoUrl);



app.listen(8000, () => {
  console.log("Server started at port 8000");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  
});


