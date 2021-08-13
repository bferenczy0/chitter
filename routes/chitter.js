const express = require('express')
const { message, User, reply} = require('../models');
const router = express.Router()
const methodOverride = require('method-override')
router.use(methodOverride('_method'))


router.use(async (req, res, next) => {
    if (req.session.userId) {
      res.locals.currentUser = await User.findOne({
        where: {
          id: req.session.userId
        }
      })
    } else {
      res.locals.currentUser = undefined
    }
    res.locals.errors = []
    next()
  })
  
  const authenticator = (req, res, next) => {
    if (req.session.userId === undefined) {
      res.redirect('/')
    } else {
      next()
    }
}

router.get('/', async (req, res) => {

    const messages = await message.findAll({
        include: {
            all: true
        },
        order: [["createdAt", "DESC"]]
    })
    const replies = await reply.findAll({
      include: {
        all: true
      }
    })
    const users = await User.findAll({})
  
    res.render('home', {messages: messages, replies: replies, users:users})
})

router.get('/chitter', authenticator, async (req, res) => {

    const users = await User.findOne({
      where: {
        id: req.session.userId
      }
    })
    const replies = await reply.findAll({
      include: {
        all: true
      }
    })
    const messages = await message.findAll({
        include: {
            all: true
        },
        order: [["createdAt", "DESC"]],
    })
    const manyUsers = await User.findAll({})
  
    res.render('chitter', {users: users, messages: messages, userId:req.session.userId, replies: replies,manyUsers:manyUsers})
})

router.delete('/:id', async (req, res) => {

  await message.destroy({
      where: {
          id: req.params.id
      }
  })

  res.redirect('/chitter');

})

module.exports = router