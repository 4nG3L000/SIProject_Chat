const mongoose = require('mongoose')
const {Schema} = mongoose
let d = new Date()

let date = `${d.getFullYear()}/${d.getMonth()}/${d.getDay()}`
let hour = `${d.getHours()}:${d.getMinutes()}`

const MessageSchema = new Schema({
    user: String,
    msg: String,
    date: {
        type: String,
        default: date
    },
    hour: {
        type: String,
        default: hour
    }
})

module.exports = mongoose.model('Message', MessageSchema)