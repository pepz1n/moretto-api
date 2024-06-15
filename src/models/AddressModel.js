import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';

const Address = sequelize.define(
  'address',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    neighborhood: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    postalCode: {
      field: 'postal_code',
      type: DataTypes.FLOAT(8, 0),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

export default Address;
