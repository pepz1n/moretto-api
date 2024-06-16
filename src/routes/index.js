import usuarioRoute from './usuarioRoute';
import pefilRoute from './pefilRoute';
import usuarioPerfilRoute from './usuarioPerfilRoute';

function Routes(app) {
  usuarioPerfilRoute(app);
  usuarioRoute(app);
  pefilRoute(app);
}

export default Routes;
