import controller from '../controllers/addressController';

export default (app) => {
  app.post('/address/persist', controller.persist);
  app.post('/address/persist/:id', controller.persist);
  app.post('/address/destroy', controller.destroy);
  app.get('/address', controller.get);
  app.get('/address/:id', controller.get);
};
