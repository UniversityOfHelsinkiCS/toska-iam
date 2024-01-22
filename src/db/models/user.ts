import { STRING, ARRAY, InferAttributes, Model } from 'sequelize'
import { sequelize } from '../connection';

class User extends Model<InferAttributes<User>> {
  declare id: string;
  declare iamGroups: string[];
}

User.init(
  {
    id: {
      type: STRING,
      primaryKey: true,
    },
    iamGroups: {
      type: ARRAY(STRING),
      allowNull: false,
      defaultValue: [],
    },
  },
  { sequelize, modelName: 'user', underscored: true },
)

module.exports = User
export default User
