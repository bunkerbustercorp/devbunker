const Router = require('koa-router');
const auth = require('./auth');
const post = require('./post');

const api = new Router();

api.use('/auth', auth.routes());
api.use('/post', post.routes());

module.exports = api;