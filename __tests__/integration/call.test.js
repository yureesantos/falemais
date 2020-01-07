import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';

describe('Call', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to make a call', async () => {
    const response = await request(app)
      .post('/calls')
      .send({
        duration: 200,
        plan_id: 3,
        source: 11,
        destination: 18,
      });
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to make a call to an undefined DDD', async () => {
    await request(app)
      .post('/calls')
      .send({
        duration: 200,
        plan_id: 1,
        source: 11,
        destination: 18,
      });
    const response = await request(app)
      .post('/calls')
      .send({
        duration: 200,
        plan_id: 1,
        source: 84,
        destination: 21,
      });
    expect(response.status).toBe(400);
  });
});
