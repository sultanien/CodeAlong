import supertest from 'supertest';
import app from '../app.js';
import { movies } from '../controllers/controller.js';

const request = supertest(app);

describe('GET /movies', () => {
    test('should return 200 status code', async () => {
      const response = await request.get('/movies');
      expect(response.statusCode).toBe(200);
    });
    test('should return an array of movies', async () => {
        const response = await request.get('/movies');
        expect(response.body).toEqual(expect.arrayContaining(movies))
      });
  });
describe("POST /movies", () => {
    describe("when passed a title, director and release_date", () => {

        const example = {
            title: "Dune",
            director: " Denis Villeneuve",
            release_date: "2021-10-22"
        };
        test("should respond with a 201 status code", async()=>{
            const response = await request.post("/movies").send(example);
            console.log(response.body);
            expect(response.statusCode).toBe(201);
        });
        test("should specify json as the content type in the http header", async()=>{
            const response = await request.post("/movies").send(example)
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        });
        test("should contain a id in the response body", async()=>{
            const response = await request.post("/movies").send(example)
            expect(response.body.id).toBeDefined()
        });
  });
  describe("when passed a title, director or release date is missing", () =>{
    test('should return 404 status code', async () => {
        const response = await request.post('/movies').send({
            director: " Denis Villeneuve",
            release_date: "2021-10-22"
        });
        expect(response.statusCode).toBe(400);
      });
  })
});

describe('GET /movies/:id', () => {
    test('should return status 200 when movie with id is found', async () => {
      const response = await request.get(`/movies/1`);
        expect(response.status).toBe(200);
    });
    test('should return status 404 when movie with id is not found', async () => {
            const response = await request.get(`/movies/1225`);
            expect(response.status).toBe(404);
    });
});

describe('DELETE /movies/:id', () => {
    test('When movie is deleted,  it should return 200 status code', async () => {
      const response = await request.delete('/movies/1');
      expect(response.status).toBe(200);
      
    });
  
    test('should return status 404 when movie with id is not found', async () => {
      const response = await request.delete('/movie/1225');
      expect(response.statusCode).toBe(404);
    });
});

describe('PATCH /movies/:id', () => {
    test('should return status 404 when movie with id is not found', async () => {
      const response = await request.patch('/movies/324245');
      expect(response.statusCode).toBe(404);
    });
  
    test('should return 200 status code', async () => {
      const response = await request
        .patch('/movies/2')
        .send({ title: 'testTitle' });
      expect(response.statusCode).toBe(200);
    });
  });