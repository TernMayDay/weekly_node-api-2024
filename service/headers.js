// 原本的 header 是為了解決 CORS 問題，所設置的。
// 所以安裝完 CORS 套件，原本的 service/heaser.js 就不需要了 （暫不刪除）
module.exports = {
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
  'Content-Type': 'application/json'
}