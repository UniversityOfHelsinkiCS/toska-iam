const { STRING, ARRAY, DATE } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('users', {
      id: {
        type: STRING,
        primaryKey: true,
        allowNull: false,
      },
      iam_groups: {
        type: ARRAY(STRING),
        allowNull: false,
        defaultValue: [],
      },
      created_at: {
        type: DATE,
        allowNull: false,
      },
      updated_at: {
        type: DATE,
        allowNull: false,
      },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('users')
  },
}
