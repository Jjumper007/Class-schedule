const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../helpers/auth')
const Note = require('../models/Note')

router.post('/new-note/:day/:month/:year', isAuthenticated, (req, res)=>{
    const newNote = new Note({
        day:req.params.day,
        month: req.params.month,
        year: req.params.year,
        description:req.body.description,
        title:req.body.title,
        user: req.user.id
    })
    newNote.save()
    res.redirect(`/${req.params.day}/${req.params.month}/${req.params.year}`)
})

router.get('/new-note/:day/:month/:year', isAuthenticated, (req, res)=>{
    res.render('notes/newNote', {day: req.params.day, month: req.params.month, year: req.params.year})
})

router.get('/edit-note/:id', isAuthenticated, async(req, res)=>{
    const note = await Note.findOne({_id:req.params.id, user: req.user.id}).lean()
    res.render('notes/editNote', { note })
})

router.post('/edit-note/:id', isAuthenticated, async(req, res)=>{
    const {description, title} = req.body
    await Note.findByIdAndUpdate(req.params.id, {title, description}).lean()
    const note = await Note.findOne({_id:req.params.id, user: req.user.id})
    const day = await note.returnDay()
    const month = await note.returnMonth()
    const year = await note.returnYear()
    res.redirect(`/${day}/${month}/${year}`)
})

router.post('/delete-note/:id', isAuthenticated, async(req, res)=>{
    var note = await Note.findOne({_id:req.params.id})
    const day = await note.returnDay()
    const month = await note.returnMonth()
    const year = await note.returnYear()
    await note.delete()
    res.redirect(`/${day}/${month}/${year}`)
})


module.exports = router