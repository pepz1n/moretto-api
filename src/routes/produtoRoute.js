import controller from '../controllers/produtoController';

export default (app) => {
  app.post('/produto', authenticate, controller.persist);
  app.patch('/produto/:id', authenticate, controller.persist);
  app.delete('/produto/:id', authenticate, controller.destroy);
  app.get('/produto', authenticate, controller.get);
  app.get('/produto/:id', authenticate, controller.get);
};
