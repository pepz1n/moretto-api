import controller from '../controllers/favoritosController';

export default (app) => {
  app.post('/favoritos', controller.persist);
  app.patch('/favoritos/:id', controller.persist);
  app.delete('/favoritos/:id', controller.destroy);
  app.get('/favoritos', controller.get);
  app.get('/favoritos/:id', controller.get);
};
