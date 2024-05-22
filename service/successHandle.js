module.exports =  (res, posts) => {
  res.send({
    status: 'success',
    posts
  }).end()
}