import controller from '../controllers/favoritosController';
import authenticate from "../middlewares/authenticate"; 

export default (app) => {
  app.post('/favoritos', authenticate, controller.persist);
  app.patch('/favoritos/:id', authenticate, controller.persist);
  app.delete('/favoritos/:id', authenticate, controller.destroy);
  app.get('/favoritos', authenticate, controller.get);
  app.get('/favoritos/:id', authenticate, controller.get);
};
