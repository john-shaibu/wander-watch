const expressAsyncHandler = require('express-async-handler')

const registerCtrl = expressAsyncHandler(async (req, res) => {
    res.json('Lets get this!!')
})

module.exports = {
    register_user: registerCtrl
}