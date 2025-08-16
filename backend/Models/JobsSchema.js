const mongoose = require("mongoose")

const JobsSchema = new mongoose.Schema({
    company_id : {type : mongoose.Schema.Types.ObjectId, ref : 'Company'},
    role : {type : String},
    skills : {type : String},
    experience : {type : String},
    location : {type : String},
    industry : {type : String},
    salary : {type : String},
    datePosted : {type : String},
    deadline : {type : String},
    experience : {type : Number},
    jobType : {type : String},
    desc : {type : String},
    responsibilities : {type : String},
    requirements : {type : String},
    available : {type : Boolean, default : true}
})

module.exports = mongoose.model('Job', JobsSchema)