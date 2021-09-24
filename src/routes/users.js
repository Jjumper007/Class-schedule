const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')

router.get('/users/signin', (req, res) => {
    res.render('users/signin')
})

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/signin',
}))

router.get('/users/signup', (req, res) => {
    res.render('users/signup')
})

router.post('/users/signup', async(req, res) => {
    const { name, email, password, confirm_password } = req.body
    const errors = []
    if (name.length == '' || name.length == ''){
        errors.push({text: 'Please fiil all the inputs'})
    }
    if (password != confirm_password){
        errors.push({text: 'Password do not math'})
    }
    if (password.length < 4){
        errors.push({text: 'Password must be higher than 4 digits'})
    }
    if (errors.length > 0){
        res.render('users/signup', {errors, name, email, password, confirm_password})
    }else{
        const emailUser = await User.findOne({email: email})
        if (emailUser){
            res.redirect('/users/signup')
        }
        const newUser = new User({name, email, password})
        newUser.password = await newUser.encryptPassword(password)
        await newUser.save()
        res.redirect('/users/signin')
    }

})

router.get('/users/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router