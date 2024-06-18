import controller from '../controllers/promocoesController';
import authenticate from '../middlewares/authenticate';
import verifyAdmin from '../middlewares/verifyAdmin';

export default (app) => {
  app.post('/promocoes', authenticate, verifyAdmin, controller.persist);
  app.patch('/promocoes/:id', authenticate, verifyAdmin,controller.persist);
  app.delete('/promocoes/:id', authenticate, verifyAdmin,controller.destroy);
  app.get('/promocoes', authenticate, controller.get);
  app.get('/promocoes/:id', authenticate, controller.get);
};
