const mongoose = require('mongoose');
const successHandle = require('../service/successHandle')
const errorHandle = require('../service/errorHandle')
const Posts = require('../model/posts')

const posts = {
  async getPosts(req, res){
    // 搜尋 content 的內容
    const timeSort = req.query.timeSort == "asc" ? "createdAt":"-createdAt"
    const q = req.query.q !== undefined ? {"content": new RegExp(req.query.q)} : {};
    // populate 引用
    const postData = await Posts.find(q).populate({
      path: 'user',
      select: 'name photo '
    }).sort(timeSort);
    // asc 遞增(由小到大，由舊到新) createdAt ; 
    // desc 遞減(由大到小、由新到舊) "-createdAt"
    // [範例]  /posts?timeSort=asc&q=測試

    successHandle(res, postData)
  },
  async createdPosts(req, res){
    try {

      const { body: data } = req  // express 套件已經內置 body 處理，故調整為
      const { user, tags, type, image, content } = data
      
      if(!content?.trim()) throw new Error('貼文內容不能空白ㄛ~');
      
      const newPosts = await Posts.create(
        {
          user,
          tags,
          type,
          image,
          content: content.trim()
        }
      )
      successHandle(res, newPosts)
      
    } catch (error) {
      errorHandle({ res, error })
    } 
  },
  async deleteAllPosts(req, res) {
    // 刪除全部貼文
    try {
      // 判斷路由是否為 /posts/ ，避免前端錯誤操作導致刪除所有資料
      if (req.originalUrl.endsWith('/posts/') ) throw new Error('缺少貼文 ID');

      const newPosts = await Posts.deleteMany({})
      successHandle(res, newPosts)

    } catch (error) {
      errorHandle({ res, error })
    }
  },
  async deletePosts(req, res) {
    // 刪除一則貼文
    try {
      const id = req.params.id

      // 檢查 id 是否是有效的 ObjectId
      if (!mongoose.Types.ObjectId.isValid(id))  throw new Error(`無效的貼文 ID : ${id}`);

      // 貼文 是否存在
      const post = await Posts.findById(id);
      if (!post) throw new Error(`此貼文不存在：${id}`);

      await Posts.findByIdAndDelete(id) // 刪除
      const postData = await Posts.find()
      successHandle(res, postData)
      
    } catch (error) {
      errorHandle({ res, error })
    }
  },
  async editPosts(req, res) {
    // 編輯修改一則貼文
    try {
      const id = req.params.id

      // 檢查 id 是否是有效的 ObjectId
      if (!mongoose.Types.ObjectId.isValid(id))  throw new Error(`無效的貼文 ID : ${id}`);

      // 貼文 是否存在
      const post = await Posts.findById(id);
      if (!post) throw new Error(`此貼文不存在：${id}`);
      
      // const data = JSON.parse(body) 
      const { body: data } = req  // express 套件已經內置 body 處理，故調整為
      const { user, tags, type, image, content } = data
      if( !content?.trim()) throw new Error('貼文內容不能空白ㄛ~');
      
      const updateData = {
        user,
        tags,
        type,
        image,
        content: content.trim()
      }

      // Patch 更新貼文成功時，可以在第三個變數帶入 { new: true } 就能取得最新的更新後的資訊。
      // 避免必填欄位為空值會被修改成功 參數 => runValidators:true （ 讓 findByIdAndUpdate 也可以跑 Schema 驗證規則 ）
      const updatedPost = await Posts.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
      successHandle(res, updatedPost)      
      
    } catch (error) {
      errorHandle({ res, error })
    }
  }
}

module.exports = posts