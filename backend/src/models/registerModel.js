const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const REG_MODEL = sequelize.define(
  "REG_MODEL",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "First name is required"
        },
        len: {
          args: [3, 50],
          msg: "First name required at least 3 charcters"
        }
      }
    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Last name is required"
        },
        len: {
          args: [3, 50],
          msg: "Last name required at least 3 charcters"
        }
      }
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Email is required"
        },
        isEmail: {
          msg: "Provide valid email"
        }
      },
      unique: {
        msg: "Email is aready exists"
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required"
        },
        len: {
          args: [6, 100],
          msg: "password must be 6 characters"
        }
      }
    },

    status:{
      type:DataTypes.ENUM("Admin","User"),
      allowNull:false
    }
  },
  {
    tableName: "user",
    timestamps: true
  }
);

module.exports = REG_MODEL;