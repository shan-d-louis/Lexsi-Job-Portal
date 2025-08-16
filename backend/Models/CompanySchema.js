const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId, ref : "User"},
    name : {type : String},
    logo : {type : Object},
    industry : {type : String},
    province : {type : String},
    country : {type : String},  
    website : {type : String},
    desc : {type : String},
    tests : {type : Array},
    approved : {type : Boolean, default : false}
})

//APPLICATION CONTROLS


module.exports = mongoose.model('Company', CompanySchema)