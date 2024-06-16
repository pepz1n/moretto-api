import controller from '../controllers/produtoController';

export default (app) => {
  app.post('/produto', controller.persist);
  app.patch('/produto/:id', controller.persist);
  app.delete('/produto/:id', controller.destroy);
  app.get('/produto', controller.get);
  app.get('/produto/:id', controller.get);
};
