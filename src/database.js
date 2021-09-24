const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/class-schedule', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err))