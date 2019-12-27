import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlansController {
  async index(req, res) {
    const plan = await Plan.findAll({
      attributes: ['id', 'title', 'duration'],
    });

    return res.json(plan);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
    });

    await schema.validate(req.body).catch(err => {
      return res.status(400).json({ error: err.message });
    });

    const { id, title, duration } = await Plan.create(req.body);

    return res.json({
      id,
      title,
      duration,
    });
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);
    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }
    Plan.destroy({ where: { id: plan.id } });
    return res.json();
  }
}

export default new PlansController();
