import controller from '../controllers/perfilController';

export default (app) => {
  app.post('/perfil', controller.persist);
  app.patch('/perfil/:id', controller.persist);
  app.delete('/perfil/:id', controller.destroy);
  app.get('/perfil', controller.get);
  app.get('/perfil/:id', controller.get);
};
