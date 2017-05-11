import _ from 'lodash';

// Routes.
import PrimeNumberRoute from './PrimeNumberRoute';

export default function createRoutes(express) {
    const router = express.Router();

    // Register routes.
    _.each([
        new PrimeNumberRoute(router)
    ], element => element.registerRoutes());

    return router;
}
