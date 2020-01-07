import Plan from '../models/Plan';

class PlansController {
  async store(req, res) {
    const { id, title, duration } = await Plan.create(req.body);

    return res.json({
      id,
      title,
      duration,
    });
  }
}

export default new PlansController();
