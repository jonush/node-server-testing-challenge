const server = require('./server');
const supertest = require('supertest');
const db = require('../data/connection');

it('should use the testing env', () => {
  expect(process.env.DB_ENV).toBe('testing');
});

describe('server.js', () => {
  it('should return api: up', () => {
    return supertest(server)
      .get('/')
      .then(res => {
        expect(res.status).toBe(200);
      })
  })

  it('should return JSON', () => {
    return supertest(server)
      .get('/')
      .then(res => {
        expect(res.type).toEqual('application/json');
      })
  })
})