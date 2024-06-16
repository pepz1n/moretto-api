import controller from '../controllers/usuarioPerfilController';
import authenticate from "../middlewares/authenticate";
import verifyAdmin from "../middlewares/verifyAdmin";

export default (app) => {
  app.post('/usuario-perfil', authenticate, verifyAdmin, controller.persist);
  app.get('/usuario-perfil/perfis-by-user/:idUsuario', authenticate, verifyAdmin, controller.getEditPerfisByUser);
  app.patch('/usuario-perfil/:id', authenticate, verifyAdmin, controller.persist);
  app.delete('/usuario-perfil/:id', authenticate, verifyAdmin, controller.destroy);
  app.get('/usuario-perfil', authenticate, verifyAdmin, controller.get);
  app.get('/usuario-perfil/:id', authenticate, verifyAdmin, controller.get);
};
