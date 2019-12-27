import { Router } from 'express';

import PlansController from './app/controllers/PlansController';
import PricesController from './app/controllers/PricesController';
import CallsController from './app/controllers/CallsController';

const routes = new Router();

routes.post('/plans', PlansController.store);
routes.post('/prices', PricesController.store);
routes.post('/calls', CallsController.store);

export default routes;
