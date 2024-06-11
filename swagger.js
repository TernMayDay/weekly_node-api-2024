const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: "My API", // 文件名稱
        description: "Description 範例" // 描述文件在做啥
    },
    host: "localhost:3000",   // 也可以使用 .env 調控
    schemes: ['http','https'], // 支援模式
    securityDefinitions: {  // 驗證
        apiKeyAuth: {
            type: 'apiKey',
            in: 'headers',
            name: 'authorization',
            description: '請加上 API Token'
        }
    },
    definitions: { 
        getPosts: {
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
}

// 輸出的文件名稱
const outputFile = './swagger-output.json'

// 要指向的 API，通常使用 Express 直接指向到 app.js 就可以
const endpointsFiles = ['./app.js'] 


swaggerAutogen(outputFile, endpointsFiles, doc)