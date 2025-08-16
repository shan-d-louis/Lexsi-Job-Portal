const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name : { type : String},
    image : {type : Object},
    email : {type : String},
    password : {type : String},
    contact : {type : String},
    resume : {type : Object},
    experience : {type : String},
    skills : {type : String},
    isAdminApproved : { type : Boolean, default : false},
    isCompany : {type : Boolean, default : false}
})


module.exports = mongoose.model('User', UserSchema);