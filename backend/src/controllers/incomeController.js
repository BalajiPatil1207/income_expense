const errorHandler = require("../helpers/errorHandler");
const INCOME = require("../models/incomeModel");

const index = async (req, res) => {
  try {
    const incomes = await INCOME.findAll({
      where: { pk_user_id: req.user.id }
    });

    return res.status(200).json({
      success: true,
      data: incomes
    });
  } catch (error) {
    const err = errorHandler(error);
    return res.status(err.status || 500).json(err);
  }
}

const store = async (req, res) => {
  try {
    console.log("USER:", req.user);
    console.log("BODY:", req.body);
    const income = await INCOME.create({ 
      ...req.body, 
      pk_user_id: req.user.id 
    });
    return res.status(201).json({
      success: true,
      message: "Income Added Successfully",
      data: income
    })
  } catch (error) {
    const err = errorHandler(error);
    res.status(err.status || 500).json(err);
  }
}

const find = async (req, res) => {
  try {
    const income = await INCOME.findByPk(req.params.id);
    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found!"
      })
    }
    return res.status(200).json({
      success: true,
      data: income
    })
  } catch (error) {
    const err = errorHandler(error);
    res.status(err.status || 500).json(err);
  }
}
const update = async (req, res) => {
  try {
    const income = await INCOME.findByPk(req.params.id);
    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found!"
      })
    }
    await income.update(req.body);

    return res.status(200).json({
      success: true,
      data: income,
      message: "Income Update Successfully"
    });
  } catch (error) {
    const err = errorHandler(error);
    res.status(err.status || 500).json(err);
  }
}
const Delete = async (req, res) => {
  try {
    const income = await INCOME.findByPk(req.params.id);
    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found!"
      })
    };
    await income.destroy();
    return res.status(200).json({
      success: true,
      data: income,
      message: "Income Delete Successfully"
    });
  } catch (error) {
    const err = errorHandler(error);
    res.status(err.status || 500).json(err);
  }
}

module.exports = {
  index,
  store,
  find,
  Delete,
  update
}