const { STRING, ARRAY } = require('sequelize')
const { sequelize } = require('../connection')

const User = sequelize.define(
  'User',
  {
    id: {
      type: STRING,
      primaryKey: true,
      allowNull: false,
    },
    iamGroups: {
      type: ARRAY(STRING),
      allowNull: false,
      defaultValue: [],
    },
    userGroups: {
      type: ARRAY(STRING),
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    underscored: true,
    sequelize,
  },
)

module.exports = User
