import Price from '../models/Price';

class PricesController {
  async store(req, res) {
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
