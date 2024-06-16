import usuarioRoute from './usuarioRoute';
import pefilRoute from './pefilRoute';
import usuarioPerfilRoute from './usuarioPerfilRoute';
import produtoRoute from './produtoRoute';
import favoritosRoute from './favoritosRoute';

function Routes(app) {
  usuarioPerfilRoute(app);
  usuarioRoute(app);
  pefilRoute(app);
  produtoRoute(app);
  favoritosRoute(app);
}

export default Routes;
