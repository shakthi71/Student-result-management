const dbInstance = require("../db/instance");
const { DataTypes } = require("sequelize");
const { STRING, INTEGER, DATEONLY } = DataTypes;

const OrderDetail = dbInstance.define("Mark", {
  dbms: {
    type: INTEGER,
    allowNull: false,
  },
  os: {
    type: INTEGER,
    allowNull: false,
  },
  jp: {
    type: INTEGER,
    allowNull: false,
  },
  pqt: {
    type: INTEGER,
    allowNull: false,
  },
  oose: {
    type: INTEGER,
    allowNull: false,
  },
  daa: {
    type: INTEGER,
    allowNull: false,
  },
  registerNumber: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  dob: {
    type: DATEONLY,
    allowNull: false,
  },
});

module.exports = OrderDetail;
