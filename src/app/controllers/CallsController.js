import * as Yup from 'yup';
import Plan from '../models/Plan';
import Price from '../models/Price';
import Call from '../models/Call';

class CallsController {
  async index(req, res) {
    const call = await Call.findAll({
      attributes: ['id', 'source', 'destination', 'price', 'normal_price'],
    });

    return res.json(call);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number().required(),
      source: Yup.number().required(),
      destination: Yup.number().required(),
      duration: Yup.number().required(),
    });

    await schema.validate(req.body).catch(err => {
      return res.status(400).json({ error: err.message });
    });

    const { plan_id, duration, source, destination } = req.body;

    const plan = await Plan.findByPk(plan_id);

    const checkPrice = await Price.findOne({
      where: { source: req.body.source, destination: req.body.destination },
    });

    if (!checkPrice) {
      return res.status(400).json({ error: 'DDD is not available' });
    }

    if (plan && duration > plan.duration) {
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
}

export default new CallsController();
