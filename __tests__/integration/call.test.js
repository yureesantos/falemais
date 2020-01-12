import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('Call', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to make a call', async () => {
    const plan = await factory.create('Plan', {
      title: 'FaleMais 30',
      duration: 30,
    });
    const price = await factory.create('Price', {
      price: 1.9,
      source: 11,
      destination: 18,
    });

    const response = await request(app)
      .post('/calls')
      .send({
        duration: 200,
        plan_id: plan.id,
        source: price.source,
        destination: price.destination,
      });
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to make a call to an undefined DDD', async () => {
    const plan = await factory.attrs('Plan');
    // Preço aleatório
    const price = await factory.attrs('Price');

    await request(app)
      .post('/calls')
      .send({
        duration: 200,
        plan_id: plan.id,
        source: 11,
        destination: 27,
      });
    const response = await request(app)
      .post('/calls')
      .send({
        duration: 200,
        plan_id: plan.id,
        source: price.source,
        destination: price.destination,
      });
    expect(response.status).toBe(400);
  });

  it('should not be able to make a call to an indefinite plan or duration', async () => {
    const price = await factory.create('Price', {
      source: 11,
      destination: 18,
      price: 1.9,
    });

    const response = await request(app)
      .post('/calls')
      .send({
        source: price.source,
        destination: price.destination,
      });
    expect(response.status).toBe(400);
  });

  it('exceeded minute prices should be calculated if call duration is longer than plan duration', async () => {
    const plan = await factory.create('Plan', {
      title: 'FaleMais 30',
      duration: 30,
    });
    const price = await factory.create('Price', {
      source: 11,
      destination: 18,
      price: 1.9,
    });

    const response = await request(app)
      .post('/calls')
      .send({
        duration: 80,
        plan_id: plan.id,
        source: price.source,
        destination: price.destination,
      });
    expect(response.body).toHaveProperty('price');
  });
});
