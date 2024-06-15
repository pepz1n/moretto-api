import adressRoute from './addressRoute';
import institutionRoute from './institutionRoute';

function Routes(app) {
  institutionRoute(app)
  adressRoute(app);
}

export default Routes;
