import Plan from '../models/Plan';
import Price from '../models/Price';
import Call from '../models/Call';

class CallsController {
  async store(req, res) {
    const { plan_id, duration, source, destination } = req.body;

    const plan = await Plan.findByPk(plan_id);

    const checkPrice = await Price.findOne({
      where: { source: req.body.source, destination: req.body.destination },
    });

    if (!checkPrice) {
      return res.status(400).json({ error: 'DDD is not available' });
    }

    if (!plan && !duration) {
      return res.status(400).json({ error: 'invalid plan and duration' });
    }

    const durationExcess = duration - plan.duration;
    const calcPrice = checkPrice.price + checkPrice.price * 0.1;
    const price = durationExcess * calcPrice;
    const normalPrice = duration * checkPrice.price;

    const call = await Call.create({
      plan_id,
      source,
      duration,
      destination,
      normal_price: normalPrice,
      price,
    });
    return res.json(call);
  }
}

export default new CallsController();
