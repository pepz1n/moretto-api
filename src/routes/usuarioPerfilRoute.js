import controller from '../controllers/usuarioPerfilController';

export default (app) => {
  app.post('/usuario-perfil', controller.persist);
  app.patch('/usuario-perfil/:id', controller.persist);
  app.delete('/usuario-perfil/:id', controller.destroy);
  app.get('/usuario-perfil', controller.get);
  app.get('/usuario-perfil/:id', controller.get);
};
