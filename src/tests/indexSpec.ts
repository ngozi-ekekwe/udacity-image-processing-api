import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

describe('Server API', () => {
  it('should return a message', async(done) => {
    const response = await request.get('');
    expect(response.text).toBe("Welcome to Image Processing API");
    done()
  })
})