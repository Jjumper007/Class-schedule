const mongoose = require("mongoose")
const { Schema } = mongoose
const NoteSchema = new Schema({
    description: {type: String, required: true},
    title: {type: String, required: true},
    user: {type: String, required: true},
    date:{type: Date, default: Date.now},
    day: {type: String, required: true},
    month: {type: String, required: true},
    year: {type: String, required: true},  
})
NoteSchema.methods.returnDay = async function () {
    return this.day
}

NoteSchema.methods.returnMonth = async function () {
    return this.month
}

NoteSchema.methods.returnYear = async function () {
    return this.year
}

module.exports = mongoose.model('Note', NoteSchema)