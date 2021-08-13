const express = require('express')
const {reply,message,User} = require('../models');
const router = express.Router()

router.get('/:id/replies', async (req,res) => {
    const messages = await message.findOne({
        include: {
            all: true
        },
        where: {
            id: req.params.id
        }
    })
    const replies = await reply.findAll({
      include: {
        all: true
      }
    })
    const users = await User.findAll({})
    res.render('reply', {messages:messages,replies:replies,users:users, userId: req.session.userId})
})

router.post('/:id/reply', async (req,res) => {
    let val = req.params.id
    console.log(val)

    await reply.create({
        text: req.body.replyText,
        messageId: req.params.id,
        UserId: req.session.userId
    })

    res.redirect(`/${val}/replies`)
})

router.get('/return', async (req,res) => {
    res.redirect('/chitter')
})

module.exports = router