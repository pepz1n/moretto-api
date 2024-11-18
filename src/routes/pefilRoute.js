import controller from '../controllers/perfilController';
import authenticate from '../middlewares/authenticate';

export default (app) => {
  app.post('/perfil', authenticate, controller.persist);
  app.patch('/perfil/:id', authenticate, controller.persist);
  app.delete('/perfil/:id', authenticate, controller.destroy);
  app.get('/perfil', authenticate, controller.get);
  app.get('/perfil/:id', authenticate, controller.get);
};
