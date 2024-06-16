import usuarioRoute from './usuarioRoute';
import pefilRoute from "./pefilRoute";

function Routes(app) {
  usuarioRoute(app);
  pefilRoute(app);
}

export default Routes;
