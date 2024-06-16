import jwt from 'jsonwebtoken';
import Usuarios from '../models/UsuariosModel';

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

    const verifyUser = await Usuarios.findOne({
      where: {
        id: user.id,
      },
    });

    if (!verifyUser) {
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

