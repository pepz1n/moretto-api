import controller from '../controllers/institutionController';

export default (app) => {
  app.post('/institution/persist', controller.persist);
  app.post('/institution/persist/:id', controller.persist);
  app.post('/institution/destroy', controller.destroy);
  app.get('/institution', controller.get);
  app.get('/institution/:id', controller.get);
};
