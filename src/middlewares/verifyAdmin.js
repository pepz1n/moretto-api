import jwt from 'jsonwebtoken';
import { sequelize } from '../config/config';

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).send({
        message: 'Token nao existe!',
      });
    }

    const user = jwt.verify(token, process.env.TOKEN_KEY);

    if (!user.id) {
      return res.status(401).send({
        message: 'Acesso negado!',
      });
    }
    console.log('oi');
    const verifyUserAdmin = await sequelize.query(`
      select
          p.nome_perfil as "nomePerfil"
      from usuario_perfil up
      join perfis p on up.id_perfil = p.id
      where up.id_usuario = ${user.id} and (p.nome_perfil = 'Admin' or p.nome_perfil = 'admin')
    `).then((a) => a[0]);
    
    if (!verifyUserAdmin.length) {
      return res.status(401).send({
        message: 'Acesso negado!',
      });
    }
    
    return next();
  } catch (error) {
    return res.status(500).send({
      message: 'Ops! Ocorreu um erro',
      error: error.message,
    });
  }
};
