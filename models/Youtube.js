const mongoose = require('mongoose')

const Youtube = mongoose.model('Youtube', {    
    title: String,
    time: String,
    user: String,
    seguidores: Number    
})

module.exports = Youtube