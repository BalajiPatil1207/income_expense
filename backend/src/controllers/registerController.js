const errorHandler = require("../helpers/errorHandler");
const REG_MODEL = require("../models/registerModel");
const bcrypt = require("bcrypt")

const register = async (req, res) => {
  try {
    const data = req.body;
    const hashPassword = await bcrypt.hash(data.password,10);
    const user = await REG_MODEL.create({
      ...data,
      password:hashPassword
    });
    return res.status(201).json({
      success:true,
      message:"User Registered Successfully",
      data:user
    });
  } catch (error) {
    console.error("DETAILED BACKEND ERROR:", error);
    const err = errorHandler(error);
    return res.status(err.status || 500).json(err);
  };
};

const login = async (req, res) => {
  try {

  } catch (error) {
   const err = errorHandler(error);
    return res.status(err.status || 500).json(err);

  }
}

const index = async (req, res) => {
  try {
    const users = await REG_MODEL.findAll();
    return res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    const err = errorHandler(error);
    return res.status(err.status || 500).json(err);

  }
}

const store = async (req, res) => {
  try {
    const user = await REG_MODEL.create(req.body);
    return res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    const err = errorHandler(error);
    return res.status(err.status || 500).json(err);

  }
}

const find = async (req, res) => {
  try {
    const user = await REG_MODEL.findByPk(req.params.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });

    }
    return res.status(200).json({
      success: true,
      data: user
    })
  } catch (error) {
    const err = errorHandler(error);
    return res.status(err.status || 500).json(err);

  }
}

const update = async (req, res) => {
  try {
    const user = await REG_MODEL.findByPk(req.data.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }
    await user.update(req.body);
    return res.status(200).json({
      success: true,
      data: user
    })
  } catch (error) {
    const err = errorHandler(error);
    return res.status(err.status || 500).json(err);

  }
}

const Delete = async (req, res) => {
  try {
    const user = await REG_MODEL.findByPk(req.data.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }
    await user.destroy();
    return res.status(200).json({
      success: true,
      data: user
    })
  } catch (error) {
    const err = errorHandler(error);
    return res.status(err.status || 500).json(err);

  }
}

module.exports = {
  register,
  login,
  index,
  store,
  Delete,
  update,
  find
};