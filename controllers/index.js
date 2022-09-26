const ExpenseData = require("../models/expense");

exports.getExpenseData = (req, res, next) => {
  ExpenseData.findAll()
    .then((result) => {
      // console.log(result, "this is result = controller");
      res.json(result);
    })
    .catch((err) => {
      console.log(err, "error in fetching data from database");
    });
};

exports.addExpenseData = (req, res, next) => {
  console.log(req.body);
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.category;

  ExpenseData.create({
    amount,
    description,
    category,
  })
    .then(() => {
      // console.log("data saved");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err, "error in creating data after doing post request");
    });
};

exports.editExpenseItem = (req, res, next) => {
  let id = req.params.itemId;
  let response;
  ExpenseData.findByPk(id)
    .then((item) => {
      response = item;
      return item.destroy();
    })
    .then(() => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err, "error in finding editing product in database");
    });
};

exports.deleteItem = (req, res, next) => {
  let id = req.params.itemId;
  // console.log(id, "id found in database");
  ExpenseData.findByPk(id)
    .then((item) => {
      return item.destroy();
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err, "error in deleting expense item");
    });
};
