const mongoose = require('mongoose')
const {Schema} = mongoose


//let date = `${d.getFullYear()}/${d.getMonth()}/${d.getDay()}`
//let hour = `${d.getHours()}:${d.getMinutes()}`

const MessageSchema = new Schema({
    user: String,
    msg: String,
    hour: String,
    date: {
        type: Date,
        default: Date.now
    }
    
})

module.exports = mongoose.model('Message', MessageSchema)