const AppSchema = require("../Models/AppSchema.js")
const UserSchema = require("../Models/UserSchema.js")
const JobsSchema = require("../Models/JobsSchema.js")
const CompanySchema = require("../Models/CompanySchema.js")

const multer = require("multer")
const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,"./Uploads");
    },
    filename : (req,file,cb) => {
        var newname = Date.now() + '-' + file.originalname;
        cb(null,newname)
    }
})

const uploadResume = multer({storage : storage}).single("resume")

const applyJob = async (req, res) => {
    var user = await UserSchema.findOne({_id : req.params.user_id})
    var job = await JobsSchema.findOne({_id : req.params.job_id}).populate("company_id")
                      
    var app = new AppSchema({
        user_id : req.params.user_id,
        email : user.email,
        resume : req.file || null,
        job_id : req.params.job_id,
        company : job.company_id.name,
        DOA : Date.now()
    })

    app.save()
        .then((result) => {
            res.status(200).json({
                Msg : "Job Applied Successfully",
                data : result
            })
        })
        .catch((err) => {
            res.status(500).json({msg : 'Internal Server Error', error : err})
        })
}

const viewApp = async (req, res) => {
    var company = await CompanySchema.findOne({_id : req.params.company_id})

    AppSchema.find({company : company.name })
        .populate("user_id")
        .populate({
            path : "job_id",
            populate : {path : "company_id"}
        })
        .then((result) => {
            res.status(200).json({
                Msg : "All Applications Viewed Successfully",
                company : company.name,
                data : result
            })
        })
        .catch((err) => {
            res.status(500).json({msg : 'Internal Server Error', error : err})
        })
}

const viewUserApp = (req,res) => {
    AppSchema.find({user_id : req.params.user_id})
        .populate({
            path : "job_id",
            populate : {path : "company_id"}
        })
        .then((result) => {
            res.status(200).json({
                Msg : "All User Applications Viewed Successfully",
                data : result
            })
        })
        .catch((err) => {
            res.status(500).json({msg : 'Internal Server Error', error : err})
        })
}

const findApp = (req,res) => {
    AppSchema.findOne({_id : req.params.app_id}).populate({path : "job_id", populate : {path : "company_id"}})
        .then((result) => {
            res.status(200).json({
                msg : "Application Found Successfully",
                data : result
            })
        })
        .catch((err) => {
            res.status(500).json({msg : "Internal Server Error", err : err})
        })
}

const updateApp = (req,res) => {
    AppSchema.updateOne({_id : req.params.app_id}, {$set : {status : req.params.status}})
        .then((result) => {
            res.status(200).json({
                Msg : "Applications Shortlisted Successfully",
                data : result
            })
        })
        .catch((err) => {
            res.status(500).json({msg : 'Internal Server Error', error : err})
        })
}

const updateStatus = (req, res) => {
    AppSchema.updateOne({_id : req.params.app_id}, {$set : {status : req.params.status}})
        .then((result) => {
            res.status(200).json({
                msg : "Application Status Updated Successfully",
                data : result
            })
        })
        .catch ((err) => {
            res.status(500).json({msg : 'Internal Server Error', error : err})
        })

}

const scheduleTechInterview = (req, res) => {
    
    AppSchema.updateOne({ _id: req.params.app_id}, {$set : {techInterviewTime : req.body.techInterviewTime, techGmeetLink : req.body.techGmeetLink, testName : req.body.testName}})
        .then((result) => {
            res.status(200).json({
                msg : "Interview Scheduled Successfully",
                data : result
            })
        })
        .catch((err) => {
            res.status(500).json({msg : 'Internal Server Error', error : err})
        })
}

const submitTechScore = (req, res) => {
    AppSchema.updateOne({_id : req.params.app_id}, {$set :  {testScore : req.body.testScore}})
        .then((result) => {
            res.status(200).json({
                msg : "Test Scores Submitted Successfully",
                data : result
            })
        })
        .catch ((err) => {res.status(500).json({msg : "Internal Sever Error", error : err})})
}

const scheduleHrInterview = (req, res) => {
    console.log(req.params.app_id)
    
    AppSchema.updateOne({ _id: req.params.app_id}, {$set : {hrInterviewTime : req.body.hrInterviewTime, hrGmeetLink : req.body.hrGmeetLink}})
        .then((result) => {
            res.status(200).json({
                msg : "HR Interview Scheduled Successfully",
                data : result
            })
        })
        .catch((err) => {
            res.status(500).json({msg : 'Internal Server Error', error : err})
        })
}
module.exports = {uploadResume,applyJob, viewApp, viewUserApp, findApp, updateApp, updateStatus, scheduleTechInterview, submitTechScore, scheduleHrInterview}