const JobsSchema = require("../Models/JobsSchema.js")
const CompanySchema = require("../Models/CompanySchema.js")

const addJob = (req, res) => {

    var job = new JobsSchema({
        company_id : req.params.company_id,
        role : req.body.role,
        skills : req.body.skills,
        experience : req.body.experience,
        location : req.body.location,
        industry : req.body.industry,
        salary : req.body.salary,
        datePosted : req.body.datePosted,
        deadline : req.body.deadline, 
        experience : req.body.experience,
        jobType : req.body.jobType,       
        desc : req.body.desc,
        responsibilities : req.body.responsibilities,
        requirements : req.body.requirements
    })
    job.save()
        .then((result) => {
            res.status(200).json({
                Message : "Job Added Successfully",
                data : result,
            })
        })
        .catch((err) => {
            res.status(500).json({msg : 'Internal Server Error', error : err})
        })

}

const viewAllJobs = (req,res) => {

    JobsSchema.find({available : true}).populate("company_id")
        .then((result) => {
            res.status(200).json({
                Message : "Jobs viewed successfully",
                data : result
            })
        })
        .catch ((err) => {
            res.status(500).json({msg : 'Internal Server Error', error : err})
        })
}

const viewCompanyJobs = (req,res) => {
    JobsSchema.find({company_id : req.params.company_id}).populate("company_id")
        .then((result) => {
            res.status(200).json({
                msg : "Company Jobs Viewed Successfully", 
                data : result
            })
        })
        .catch((err) => {
            res.status(500).json({msg : 'Internal Server Error', error : err})
        })
}

const searchJob = (req,res) => {
    JobsSchema.find({role : {$regex : req.params.role, $options : "i"}})
        .then((result) => {
            res.status(200).json({
                Message : "Search Successful",
                data : result
            })
        })
        .catch ((err) => {
            res.status(500).json({msg : 'Internal Server Error', error : err})
        })
}

const deleteJob = (req, res) => {
    JobsSchema.updateOne({_id : req.params.id}, {$set : {available : false}})
        .then((result) => {
            res.status(200).json({
                Message : "Job Removed Successful",
                data : result
            })
        })
        .catch ((err) => {
            res.status(500).json({msg : 'Internal Server Error', error : err})
        })

}

const findJob = (req, res) => {
    JobsSchema.find({_id : req.params.job_id}).populate("company_id")
        .then((result) => {
            res.status(200).json({
                msg : "Job Found Successfully",
                data : result
            })
        })
        .catch((err) => {
            res.status(500).json({msg : 'Internal Server Error', error : err})
        })
}
module.exports = {addJob, viewAllJobs, searchJob, deleteJob, findJob, viewCompanyJobs}