const genre = require('../../models/genre');
const request = require('supertest')
let server;

describe('/api/v1/genres', () => {
    beforeEach(() => {server = require('../../index');});
    afterEach(() => {
        server.close();
        genre.deleteAll();
    });

    describe('GET /', () => {
        it('should return all genres', async () => {

            await genre.create({name: 'genre1'});
            await genre.create({name: 'genre2'});

            const res = await request(server).get('/api/v1/genres');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g=>g.name==='genre1')).toBeTruthy();
            expect(res.body.some(g=>g.name==='genre2')).toBeTruthy();
        });
    });
});