const Router = require('koa-router');

const post = new Router();
const postCtrl = require('./post.ctrl');

post.post('/insertpost', postCtrl.insertPost);
post.post('/updatepost', postCtrl.updatePost);
post.post('/deletepost', postCtrl.deletePost);
post.post('/loadpost', postCtrl.loadPost);
post.get('/loadpostlist', postCtrl.loadPostList);

module.exports = post;