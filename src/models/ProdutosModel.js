import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';
import Usuarios from "./UsuariosModel";

const Produtos = sequelize.define(
  'produtos',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      field: 'nome_produto',
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    descricao: {
        field: 'descricao',
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    preco: {
      field: 'preco',
      type: DataTypes.STRING(50),
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

Produtos.belongsTo(Usuarios, {
  as: 'usuario',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'idUsuarioCriador',
    field: 'id_usuario_criador',
    allowNull: true,
  },
});

export default Produtos;
