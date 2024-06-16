import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';

const Perfis = sequelize.define(
  'perfis',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nomePerfil: {
      field: 'nome_perfil',
      type: DataTypes.STRING(50),
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
export default Perfis;
