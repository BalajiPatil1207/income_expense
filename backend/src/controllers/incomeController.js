const errorHandler = require("../helpers/errorHandler");

const index = async (req, res) => {
  try {
    
  } catch (error) {
    const err = errorHandler(error);
    res.status(err.status || 500).json(err);
  }
}
const store = async (req, res) => {
  try {
    
  } catch (error) {
    const err = errorHandler(error);
    res.status(err.status || 500).json(err);
  }
}
const find = async (req, res) => {
  try {
    
  } catch (error) {
    const err = errorHandler(error);
    res.status(err.status || 500).json(err);
  }
}
const update = async (req, res) => {
  try {
    
  } catch (error) {
    const err = errorHandler(error);
    res.status(err.status || 500).json(err);
  }
}
const Delete = async (req, res) => {
  try {
    
  } catch (error) {
    const err = errorHandler(error);
    res.status(err.status || 500).json(err);
  }
}

module.exports={
  index,
  store,
  find,
  Delete,
  update
}