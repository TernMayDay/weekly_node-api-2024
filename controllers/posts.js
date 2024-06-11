const mongoose = require('mongoose');
const successHandle = require('../service/successHandle')
const errorHandle = require('../service/errorHandle')
const Posts = require('../model/posts')

const posts = {
  async getPosts(req, res){
    /**
     * #swagger.tags = ['Posts - 貼文']
     * #swagger.description = '取得全部貼文'
     * #swagger.responses[200] = {
        description: 'Some description...',
        schema: {
          $ref: "#/definitions/getPosts"
        }
      }
     */

    const postData = await Posts.find()
    successHandle(res, postData)
  },
  async createdPosts(req, res){
     /**
     * #swagger.tags = ['Posts - 貼文']
     * #swagger.description = '新增一則貼文'
     * #swagger.parameters['body'] = {
          in: "body",
          type: "object",
          required: true,
          description: '資料格式',
          schema: {
            $name: "keven",
            $tags: "游泳",
            $type: "group",
            image:"https://picsum.photos/id/866/4704/3136",
            $content: "貼文內容呀-1",
            likes: 0,
            comments: 0
          }
        }
     * #swagger.responses[200] = {
        description: 'Some description...',
        schema: {
          status: "success",
          posts: [
            {
              _id: "66569a7e00dce88dcf5a9993",
              name: "keven",
              tags: [
                  "游泳"
              ],
              type: "group",
              image: "https://picsum.photos/id/866/4704/3136",
              content: "貼文內容呀-2",
              likes: 0,
              comments: 0
            }
          ]  
        }
      }
     */

    try {
      // const data = JSON.parse(body) 
      const { body: data } = req  // express 套件已經內置 body 處理，故調整為
      const { name, tags, type, image, content } = data
      
      if(!content?.trim()) throw new Error('貼文內容不能空白ㄛ~');
      
      const newPosts = await Posts.create(
        {
          name,
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
     /**
     * #swagger.tags = ['Posts - 貼文']
     * #swagger.description = '刪除全部貼文',
     * #swagger.security = [{ apiKeyAuth: [] }]
     */

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
     /**
     * #swagger.tags = ['Posts - 貼文']
     * #swagger.description = '新增一則貼文'
     */

    // 刪除一則貼文
    try {
      // const id = req.url.split('/').pop()
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
     /**
     * #swagger.tags = ['Posts - 貼文']
     * #swagger.description = '修改一則貼文'
     */

    // 編輯修改一則貼文
    try {
      // const id = req.url.split('/').pop()
      const id = req.params.id

      // 檢查 id 是否是有效的 ObjectId
      if (!mongoose.Types.ObjectId.isValid(id))  throw new Error(`無效的貼文 ID : ${id}`);

      // 貼文 是否存在
      const post = await Posts.findById(id);
      if (!post) throw new Error(`此貼文不存在：${id}`);
      
      // const data = JSON.parse(body) 
      const { body: data } = req  // express 套件已經內置 body 處理，故調整為
      const { name, tags, type, image, content } = data
      if( !content?.trim()) throw new Error('貼文內容不能空白ㄛ~');
      
      const updateData = {
        name,
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