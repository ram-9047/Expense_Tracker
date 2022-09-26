const express = require("express");
// const routeController = require("../controllers/index");
const {
  getExpenseData,
  addExpenseData,
  editExpenseItem,
  deleteItem,
} = require("../controllers/index");
const router = express.Router();

// homepage - get all the data from database
router.get("/", getExpenseData);

// add new expense
router.post("/add-item", addExpenseData);

//edit an expense
router.get("/edit-item/:itemId", editExpenseItem);

//delete an expense
router.post("/delete-item/:itemId", deleteItem);

module.exports = router;
