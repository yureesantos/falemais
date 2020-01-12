import { factory } from 'factory-girl';

import Plan from '../src/app/models/Plan';
import Call from '../src/app/models/Call';
import Price from '../src/app/models/Price';

factory.define('Price', Price, {
  source: 11,
  destination: 18,
  price: 1.9,
});

factory.define('Plan', Plan, {
  name: 'FaleMais 30',
  duration: 30,
});

factory.define('Call', Call, {
  plan_id: 1,
  duration: 200,
  source: 11,
  destination: 18,
});

export default factory;
