import usuarioRoute from './usuarioRoute';
import pefilRoute from './pefilRoute';
import usuarioPerfilRoute from './usuarioPerfilRoute';
import produtoRoute from "./produtoRoute";

function Routes(app) {
  usuarioPerfilRoute(app);
  usuarioRoute(app);
  pefilRoute(app);
  produtoRoute(app);
}

export default Routes;
