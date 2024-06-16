import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UsuariosModel from '../models/UsuariosModel';

const get = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await UsuariosModel.findAll({
        order: [['id', 'asc']],
      });
      return res.status(200).send({
        message: 'Registros carregados com sucesso',
        data: response,
      });
    }

    const response = await UsuariosModel.findOne({ where: { id } });

    if (!response) {
      return res.status(400).send({
        message: `Nenhum registro com id ${id}`,
        data: [],
      });
    }

    return res.status(200).send({
      message: 'Registro carregado com sucesso',
      data: response,
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Ops! Ocorreu um erro',
      error: error.message,
    });
  }
};

const register = async (req, res) => {
  try {
    const {
      nomeCompleto,
      email,
      senha,
      cpfCnpj,
    } = req.body;

    const verifyMail = await UsuariosModel.findOne({
      where: { email },
    });
    if (verifyMail) {
      return res.status(400).send({
        message: 'Ja existe um usuario com este email!',
        data: [],
      });
    }

    const passwordHash = await bcrypt.hash(senha, 10);

    await UsuariosModel.create({
      nomeCompleto,
      email,
      passwordHash,
      cpfCnpj,
    });

    return res.status(201).send({
      message: 'Conta Criada!',
      data: [],
    });
  } catch (e) {
    return res.status(500).send({
      message: 'Erro no Servidor',
      data: e.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const {
      email,
      senha,
    } = req.body;

    const verifyUser = await UsuariosModel.findOne({
      where: {
        email,
      },
    });

    if (!verifyUser) {
      return res.status(400).send({
        message: 'Usuario ou senha incorretos!',
        data: [],
      });
    }

    const response = await bcrypt.compare(senha, verifyUser.passwordHash);

    if (!response) {
      return res.status(400).send({
        message: 'Usuario ou senha incorretos!',
        data: [],
      });
    }

    const token = jwt.sign({ nome: verifyUser.nome, id: verifyUser.id }, process.env.TOKEN_KEY, { expiresIn: '5h' });

    return res.status(200).send({
      message: 'Usuario logado com sucesso',
      data: token,
    });
  } catch (e) {
    return res.status(500).send({
      message: 'Erro no Servidor',
      data: e.message,
    });
  }
};

const update = async (req, res) => {
  const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

  if (!id) {
    return res.status(400).send({
      message: 'Nenhum id informado',
      data: [],
    });
  }

  const response = await UsuariosModel.findOne({ where: { id } });

  if (!response) {
    return res.status(400).send({
      message: `Nenhum registro com id ${id} para atualizar`,
      data: [],
    });
  }
  if (req.body.senha) {
    req.body.senha = null;
  }
  Object.keys(req.body).forEach((field) => response[field] = req.body[field]);

  await response.save();
  return res.status(200).send({
    message: `Registro id ${id} atualizado com sucesso`,
    data: response,
  });
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(400).send({
        message: 'Informe um id para deletar o registro',
        data: [],
      });
    }

    const response = await UsuariosModel.findOne({ where: { id } });

    if (!response) {
      return res.status(400).send({
        message: `Nenhum registro com id ${id} para deletar`,
        data: [],
      });
    }

    await response.destroy();
    return res.status(200).send({
      message: `Registro id ${id} deletado com sucesso`,
      data: [],
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Ops! Ocorreu um erro',
      error: error.message,
    });
  }
};

export default {
  get,
  login,
  register,
  update,
  destroy,
};
