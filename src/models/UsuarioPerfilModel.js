import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';
import Usuarios from './UsuariosModel';
import PerfisModel from './PerfisModel';

const UsuarioPerfil = sequelize.define(
  'usuario_perfil',
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

UsuarioPerfil.belongsTo(Usuarios, {
  as: 'usuario',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'idUsuario',
    field: 'id_usuario',
    allowNull: false,
  },
});

UsuarioPerfil.belongsTo(PerfisModel, {
  as: 'perfil',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'idPerfil',
    field: 'id_perfil',
    allowNull: false,
  },
});

export default UsuarioPerfil;
