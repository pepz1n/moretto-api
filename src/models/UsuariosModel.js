import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';

const Usuarios = sequelize.define(
  'usuarios',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nomeCompleto: {
      field: 'nome_completo',
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    cpfCnpj: {
      field: 'cpf_cnpj',
      type: DataTypes.STRING(18),
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      field: 'password_hash',
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

export default Usuarios;
