import axios from 'axios';

describe('GET /api', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/api`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({
      message: 'Hello Traditional Angular API with RxJS Observables',
      requestCount: expect.any(Number),
      timestamp: expect.any(String)
    });
  });
});
