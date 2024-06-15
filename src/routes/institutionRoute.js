import controller from '../controllers/institutionController';

export default (app) => {
  app.post('/institution/persist', controller.persist);
  app.patch('/institution/persist/:id', controller.persist);
  app.delete('/institution/destroy/:id', controller.destroy);
  app.get('/institution', controller.get);
  app.get('/institution/:id', controller.get);
};
