const express = require('express')
const {User} = require('../models');
const router = express.Router()
const bcrypt = require('bcryptjs')

router.get('/signUp', async (req,res) => {
    res.render('signUp')
})

router.post('/newUser', async (req,res) => {
    try{
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        passwordHash: bcrypt.hashSync(req.body.password)
    })

    req.session.userId = user.id

    res.redirect('/chitter')

    } catch(error){
        res.render('signUpFail')
    }
})

router.get('/login', (req,res) => {
    res.render('signIn')
})

router.post('/User', async (req,res) => {
    const user = await User.findOne({
        where: {
            username:req.body.username
        }
    })
    if(user && bcrypt.compareSync(req.body.password,user.passwordHash)) {
        req.session.userId = user.id
    } else {
        // render the same sign in form, with the error message
        res.render('signIn', { errors: ["sorry, details not valid"] })
    }

    res.redirect('/chitter')
})

router.post('/signOut', (req, res) => {
    // delete the user id from the session
    req.session.userId = undefined
    res.redirect('/')
  })

module.exports = router