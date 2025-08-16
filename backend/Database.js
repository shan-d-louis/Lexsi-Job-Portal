const mongoose =require('mongoose')
mongoose.connect('mongodb://127.0.0.1/Lexsi')

var db = mongoose.connection
db.on('error' , console.error.bind('error'))

db.once('open', ()=>{
    console.log("Database connected");

})

module.exports = db