import request from 'supertest';
import app from '../../src/app';

describe('Plan', () => {
  it('should be able to create a plan', async () => {
    const response = await request(app)
      .post('/plans')
      .send({
        title: 'FaleMais 30',
        duration: 30,
      });

    expect(response.body).toHaveProperty('id');
  });
});
