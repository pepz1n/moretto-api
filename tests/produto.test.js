import request from 'supertest';
import app from '../src/server';
import { sequelize } from "../src/config/config.js";

let server;

// Inicia o servidor antes de rodar os testes
beforeAll(() => {
  server = app.listen(process.env.API_PORT);
});

// Fecha o servidor e a conexão com o banco de dados após os testes
afterAll(async () => {
  await sequelize.close();  // Fecha a conexão com o banco de dados corretamente
  server.close();            // Fecha o servidor
});

// -----------------------------------
// Testes Funcionais (Functional Testing)
// -----------------------------------
describe('GET /produto', () => {
  it('Deve retornar todos os produtos (Funcional)', async () => {
    const response = await request(app).get('/produto');
    expect(response.status).toBe(200);  // Espera-se um status 200 OK
    expect(response.body.data).toBeInstanceOf(Array);  // Verifica se a chave `data` é um array de produtos
  });

  it('Deve retornar o produto de ID 2 se existir (Funcional)', async () => {
    const response = await request(app).get('/produto/2');  // Produto com ID 2
    expect(response.body.data).toBeInstanceOf(Object);
    expect(response.body.data.id).toBe(2);  // Verifica se o ID retornado é o esperado
  });

  it('Deve retornar erro 400 se o produto não existir (Funcional)', async () => {
    const response = await request(app).get('/produto/9999');  // Produto não existente
    expect(response.status).toBe(400);  // Espera-se que o status seja 400 Bad Request
    expect(response.body.data).toStrictEqual([]);
  });
});

// -----------------------------------
// Testes de Validação de Dados (Data Validation Testing)
// -----------------------------------
describe('POST /produto', () => {
  it('Deve criar um novo produto (Validação de Dados)', async () => {
    const newProduct = {
      nome: 'Produto Teste',
      descricao: 'Descrição do produto',
      preco: 5,
    };
    const response = await request(app).post('/produto').send(newProduct);
    expect(response.status).toBe(200);  // Status de sucesso
    expect(response.body.data.nome).toBe(newProduct.nome);
  });

  it('Não deve criar produto com dados inválidos (Validação de Dados)', async () => {
    const invalidProduct = {
      nome: '',
      descricao: '',
      preco: -10,  // Preço negativo, inválido
    };
    const response = await request(app).post('/produto').send(invalidProduct);
    expect(response.status).toBe(400);  // Status de erro
    expect(response.body.message).toBe('Ops! Ocorreu um erro');
  });
});

// -----------------------------------
// Testes de Erro e Exceção (Error and Exception Testing)
// -----------------------------------
describe('PATCH /produto/:id', () => {
  it('Deve retornar erro 400 quando tentando atualizar produto com dados inválidos (Erro e Exceção)', async () => {
    const invalidProduct = {
      preco: -10,
    };
    const response = await request(app).patch('/produto/2').send(invalidProduct);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Ops! Ocorreu um erro');
  });

  it('Não deve atualizar produto inexistente (Erro e Exceção)', async () => {
    const updatedProduct = {
      nome: 'Produto Inexistente',
      descricao: 'Descrição do produto',
      preco: '100',
    };
    const response = await request(app).patch('/produto/9999').send(updatedProduct);  // ID inexistente
    expect(response.status).toBe(400);  // Erro de não encontrado
    expect(response.body.message).toBe('Nenhum registro com id 9999 para atualizar');
    expect(response.body.data).toStrictEqual([]);
  });
});

// -----------------------------------
// Testes de Integração (Integration Testing)
// -----------------------------------
describe('DELETE /produto/:id', () => {
  it('Deve excluir um produto com sucesso (Integração)', async () => {
    const newProduct = {
      nome: 'Produto Teste',
      descricao: 'Descrição do produto',
      preco: 5,
    };
    const responseCreate = await request(app).post('/produto').send(newProduct);
    const idToDelete = responseCreate.body.data.id;
    const responseDelete = await request(app).delete(`/produto/${idToDelete}`);  // ID do produto que foi criado no banco
    expect(responseDelete.status).toBe(200);
    expect(responseDelete.body.message).toBe(`Registro id ${idToDelete} deletado com sucesso`);
  });

  it('Não deve excluir produto inexistente (Integração)', async () => {
    const response = await request(app).delete('/produto/999999');  // Produto inexistente
    expect(response.status).toBe(400);  // Status de erro
    expect(response.body.message).toBe('Nenhum registro com id 999999 para deletar');
  });
});