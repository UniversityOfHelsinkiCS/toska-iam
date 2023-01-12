const { ARRAY, STRING } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'user_groups')
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('users', 'user_groups', {
      type: ARRAY(STRING),
      allowNull: false,
      defaultValue: [],
    })
  },
}
