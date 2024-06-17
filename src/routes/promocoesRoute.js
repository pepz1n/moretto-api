import controller from '../controllers/promocoesController';

export default (app) => {
  app.post('/promocoes', controller.persist);
  app.patch('/promocoes/:id', controller.persist);
  app.delete('/promocoes/:id', controller.destroy);
  app.get('/promocoes', controller.get);
  app.get('/promocoes/:id', controller.get);
};
