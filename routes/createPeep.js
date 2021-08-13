const express = require('express')
const {message} = require('../models');
const router = express.Router()

router.post('/makePeep', async (req, res) => {
    await message.create(
        {
          peep:  req.body.peep,
          UserId: req.session.userId
        })

    res.redirect('/chitter');
   
})

module.exports = router