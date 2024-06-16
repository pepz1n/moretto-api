import controller from '../controllers/perfilController';
import authenticate from '../middlewares/authenticate';
import verifyAdmin from '../middlewares/verifyAdmin';

export default (app) => {
  app.post('/perfil', authenticate, verifyAdmin, controller.persist);
  app.patch('/perfil/:id', authenticate, verifyAdmin, controller.persist);
  app.delete('/perfil/:id', authenticate, verifyAdmin, controller.destroy);
  app.get('/perfil', authenticate, verifyAdmin, controller.get);
  app.get('/perfil/:id', authenticate, verifyAdmin, controller.get);
};
