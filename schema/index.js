const mutations =require('./mutations');
const queries = require('./queries');
const types = require('./types');

module.exports= types.concat(queries, mutations)
