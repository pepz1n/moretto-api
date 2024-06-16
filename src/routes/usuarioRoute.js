import controller from '../controllers/usuarioController';

export default (app) => {
  app.post('/usuario/register', controller.register);
  app.post('/usuario/login', controller.login);
  app.post('/usuario/persist', controller.persist);
  app.post('/usuario/persist/:id', controller.persist);
  app.post('/usuario/destroy', controller.destroy);
  app.get('/usuario', controller.get);
  app.get('/usuario/:id', controller.get);
};
