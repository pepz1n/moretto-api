import controller from '../controllers/usuarioController';

export default (app) => {
  app.post('/usuario/register', controller.register);
  app.post('/usuario/login', controller.login);
  app.patch('/usuario/:id', controller.update);
  app.delete('/usuario/:id', controller.destroy);
  app.get('/usuario', controller.get);
  app.get('/usuario/:id', controller.get);
};
