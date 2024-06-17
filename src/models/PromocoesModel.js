import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';
import Produtos from './ProdutosModel';

const Promocoes = sequelize.define(
  'promocoes',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_produto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Produtos,
        key: 'id',
      },
    },
    titulo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    percentual_desconto: {
      type: DataTypes.NUMERIC(5, 2),
      allowNull: false,
    },
    data_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data_fim: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

Promocoes.belongsTo(Produtos, {
  as: 'produto',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'id_produto',
    field: 'id_produto',
    allowNull: false,
  },
});

export default Promocoes;
