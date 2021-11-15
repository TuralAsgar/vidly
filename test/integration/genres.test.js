const request = require('supertest')
let server;

describe('/api/v1/genres', () => {
    beforeEach(() => {server = require('../../index');});
    afterEach(() => {server.close();});

    describe('GET /', () => {
        it('should return all genres', async () => {
            const res = await request(server).get('/api/v1/genres');
            expect(res.status).toBe(200);
        });
    });
});