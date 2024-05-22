var express = require('express');
var router = express.Router();
// const { getPosts, createdPosts, deleteAllPosts, deletePosts, editPosts} = require('../controllers/posts')
const PostsControllers = require('../controllers/posts')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// 正文
router.get('/', PostsControllers.getPosts);

router.post('/', PostsControllers.createdPosts);

router.delete('/', PostsControllers.deleteAllPosts); // 刪除全部貼文

router.delete('/:id', PostsControllers.deletePosts); // 刪除一則貼文

router.patch('/:id', PostsControllers.editPosts); // 編輯修改一則貼文

module.exports = router;
