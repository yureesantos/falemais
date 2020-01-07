import request from 'supertest';
import app from '../../src/app';

describe('Price', () => {
  it('should be able to create a predefined price', async () => {
    const response = await request(app)
      .post('/prices')
      .send({
        source: 18,
        destination: 11,
        price: 1.9,
      });

    expect(response.body).toHaveProperty('id');
  });
});
