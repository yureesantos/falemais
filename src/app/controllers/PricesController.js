import * as Yup from 'yup';
import Price from '../models/Price';

class PricesController {
  async store(req, res) {
    const schema = Yup.object().shape({
      source: Yup.number().required(),
      destination: Yup.number().required(),
      price: Yup.number().required(),
    });

    await schema.validate(req.body).catch(err => {
      return res.status(400).json({ error: err.message });
    });

    const { id, source, destination, price } = await Price.create(req.body);

    return res.json({
      id,
      source,
      destination,
      price,
    });
  }
}

export default new PricesController();
