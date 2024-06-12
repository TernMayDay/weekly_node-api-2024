const mongoose = require('mongoose');
const successHandle = require('../service/successHandle')
const errorHandle = require('../service/errorHandle')
const Users = require('../model/users')

const users = {
  async getUsers(req, res) {
    const userData = await Users.find()
    successHandle(res, userData)
  } 

}
module.exports = users