import controller from '../controllers/usuarioController';
import authenticate from '../middlewares/authenticate';
import verifyAdmin from '../middlewares/verifyAdmin';

export default (app) => {
  app.post('/usuario/register', controller.register);
  app.post('/usuario/login', controller.login);
  app.patch('/usuario/:id', authenticate, verifyAdmin, controller.update);
  app.delete('/usuario/:id', authenticate, verifyAdmin, controller.destroy);
  app.get('/usuario/get-info-by-token', authenticate, controller.getdataByToken);
  app.get('/usuario', authenticate, verifyAdmin, controller.get);
  app.get('/usuario/:id', authenticate, verifyAdmin, controller.get);
};
