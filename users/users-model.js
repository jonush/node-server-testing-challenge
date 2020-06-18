const db = require('../data/connection');

function find() {
  return db('users').select('id', 'username').orderBy('id');
}

function findBy(filter) {
  return db('users')
    .where(filter)
    .select('id', 'username', 'password')
    .orderBy('id');
}

function findById(id) {
  return db('users').where({ id }).first();
}

function add(user) {
  return db('users')
    .insert(user, 'id')
    .then(ids => findById(ids[0]))
    .catch(err => console.log(err))
}

function remove(id) {
  return db('users')
    .where({ id })
    .del()
}

module.exports = {
  find,
  findBy,
  findById,
  add,
  remove
};