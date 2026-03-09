const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const REG_MODEL = require("./registerModel");

const INCOME = sequelize.define(
  "INCOME",
  {
    income_id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    pk_user_id:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    source:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Source is required"
        },
        len:{
          args:[3,255],
          msg:"Source at least 3 character"
        }
      }
    },

    amount:{
      type:DataTypes.DECIMAL,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Amount is required"
        },
        isNumeric:{
          msg:"Amount allow digits"
        }
      }
    },
    date:{
      type:DataTypes.DATEONLY,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Date is required"
        },
        isDate:{

        }
      }
    },
    time:{
      type:DataTypes.TIME,
      allowNull:false,
    }
  },
  {
   tableName:"income",
   timestamps:true 
  }
);

// REG_MODEL.hasMany(INCOME,{
//   foreignKey:"user_ID",
//   onDelete:"CASCADE"
// });

// INCOME.belongsTo(REG_MODEL,{
//   foreignKey:"user_ID"
// });

module.exports = INCOME;