const server = require('../api/server');
const supertest = require('supertest');
const db = require('../data/connection');

describe('auth-router.js', () => {
  // ADD A USER
  describe('POST to /auth/register', () => {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it('should register a new user', () => {
      return supertest(server)
        .post('/auth/register')
        .send({ username: "Joe", password: "pass" })
        .then(res => {
          expect(res.status).toBe(201);
        })
    })
  })

  // LOG IN A USER
  describe('POST to /auth/login', () => {
    it('should log in a user with credentials', () => {
      return supertest(server)
        .post('/auth/login')
        .send({ username: "Joe", password: "pass" })
        .then(res => {
          expect(res.status).toBe(200);
          expect(res.body.message).toBe('Welcome to the API, Joe');
        })
    })

    it('should return a JSON token upon successful login', () => {
      return supertest(server)
        .post('/auth/login')
        .send({ username: "Joe", password: "pass" })
        .then(res => {
          expect(res.body.token).toBeTruthy();
        })
    })
  })

  // DELETE A USER
  describe('DELETE to /auth/users/:id', () => {
    it('should delete the user', () => {
      return supertest(server)
        .delete('/auth/users/1')
        .then(res => {
          expect(res.status).toBe(200);
          expect(res.body.removed).toBe(1);
        })
    })
  })
})