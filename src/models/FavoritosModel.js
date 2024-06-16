import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';
import Produtos from './ProdutosModel';
import Usuarios from './UsuariosModel';

const Favoritos = sequelize.define(
  'favoritos',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

Favoritos.belongsTo(Usuarios, {
  as: 'usuario',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'idUsuario',
    field: 'id_usuario',
    allowNull: true,
  },
});

Favoritos.belongsTo(Produtos, {
  as: 'produtos',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'idProduto',
    field: 'id_produto',
    allowNull: true,
  },
});

export default Favoritos;
