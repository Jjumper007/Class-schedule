const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../helpers/auth')
const Note = require('../models/Note')

router.get('/', isAuthenticated, (req, res) => {
    res.render('index', { userName: req.user.name })
})

router.get('/:numberDay/:numberMonth/:year', isAuthenticated, async(req, res) => {
    const day = req.params.numberDay
    const month = req.params.numberMonth
    const year = req.params.year
    let newNote
    let noNote
    if (await Note.findOne({user:req.user.id, day, month, year})){
        newNote = await Note.find({user:req.user.id, day, month, year}).sort({date: 'desc'}).lean()
    }else{
        noNote = 'Aun no tienes notas para este dia, crea una'
    }

    res.render('index', {newNote, noNote, day, month, year})
})

module.exports = router