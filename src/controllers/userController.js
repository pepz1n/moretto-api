import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';

const get = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await UserModel.findAll({
        order: [['id', 'asc']],
      });
      return res.status(200).send({
        type: 'success',
        message: 'Registros carregados com sucesso',
        data: response,
      });
    }

    const response = await UserModel.findOne({ where: { id } });

    if (!response) {
      return res.status(200).send({
        type: 'error',
        message: `Nenhum registro com id ${id}`,
        data: [],
      });
    }

    return res.status(200).send({
      type: 'success',
      message: 'Registro carregado com sucesso',
      data: response,
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error: error.message,
    });
  }
};

const register = async (req, res) => {
  try {
    const {
      nome,
      email,
      senha,
      cpf,
      telefone,
    } = req.body;

    const verifyMail = UserModel.findOne({
      where: { email },
    });
    if (verifyMail) {
      return res.status(400).send({
        message: 'Ja existe um usuario com este email!',
        data: [],
      });
    }

    const passwordHash = bcrypt.hash(senha, 10);

    const response = await UserModel.create({
      nome,
      email,
      passwordHash,
      cpf,
      telefone,
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

    const verifyUser = UserModel.findOne({
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

    const response = bcrypt.compare(senha, verifyUser.passwordHash);

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

const create = async (dados, res) => {
  const {
    country, state, city, neighborhood, street, postalCode,
  } = dados;

  const response = await UserModel.create({
    country,
    state,
    city,
    neighborhood,
    street,
    postalCode,
  });

  return res.status(200).send({
    type: 'success',
    message: 'Cadastro realizado com sucesso',
    data: response,
  });
};

const update = async (id, dados, res) => {
  const response = await UserModel.findOne({ where: { id } });

  if (!response) {
    return res.status(200).send({
      type: 'error',
      message: `Nenhum registro com id ${id} para atualizar`,
      data: [],
    });
  }

  Object.keys(dados).forEach((field) => response[field] = dados[field]);

  await response.save();
  return res.status(200).send({
    type: 'success',
    message: `Registro id ${id} atualizado com sucesso`,
    data: response,
  });
};

const persist = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      return await create(req.body, res);
    }

    return await update(id, req.body, res);
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.body.id ? req.body.id.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(200).send({
        type: 'error',
        message: 'Informe um id para deletar o registro',
        data: [],
      });
    }

    const response = await UserModel.findOne({ where: { id } });

    if (!response) {
      return res.status(200).send({
        type: 'error',
        message: `Nenhum registro com id ${id} para deletar`,
        data: [],
      });
    }

    await response.destroy();
    return res.status(200).send({
      type: 'success',
      message: `Registro id ${id} deletado com sucesso`,
      data: [],
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error: error.message,
    });
  }
};

export default {
  get,
  login,
  register,
  persist,
  destroy,
};
