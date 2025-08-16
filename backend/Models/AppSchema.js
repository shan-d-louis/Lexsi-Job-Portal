const mongoose = require("mongoose")

const AppSchema = new mongoose.Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
    email : {type : String},
    resume : {type : Object},

    job_id : {type : mongoose.Schema.Types.ObjectId, ref : 'Job'},
    company : {type : String},

    DOA : {type : Date, default : Date.now},    
    status: {type : Number, default : 0},

    techInterviewTime : {type : Date, required : false},
    techGmeetLink : {type : String, required : false},
    testName : {type : String, required : false},
    testScore : {type : String, default : "N/A"},

    hrInterviewTime : {type : Date, required : false},
    hrGmeetLink : {type : String, required : false}
})

module.exports = mongoose.model("Applicant", AppSchema)