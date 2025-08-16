const express = require('express')
const router = express.Router()
const UserController = require('./Controllers/UserController')
const CompanyController = require("./Controllers/CompanyController")
const JobController = require("./Controllers/JobControllers")
const AppController = require("./Controllers/AppControllers")

//REGISTER & LOGIN
router.post('/register', UserController.uploadImage, UserController.register)
router.post('/login', UserController.login)

//USER FUNCTIONS
router.post("/find-user/:user_id",UserController.findUser)      
router.post("/update-user/:user_id/:field/:value", UserController.updateUserField)      
router.post("/update-user-profile/:user_id", UserController.uploadImage, UserController.updateUserImage) 
router.post("/view-users", UserController.viewUsers)
router.post("/remove-user/:id", UserController.deleteUser)
router.post("/reset-password/:email", UserController.resetPassword)


//COMPANY FUNCTIONS
router.post('/register-company/:user_id', CompanyController.uploadLogo, CompanyController.registerCompany)     //EMPLOYER
router.post("/approve-company/:company_id/:user_id", CompanyController.approveCompany)   //ADMIN
router.post('/remove-company/:id', CompanyController.deleteCompany)     //ADMIN
router.post('/view-companies', CompanyController.viewAllCompany)        //ADMIN, USERS
router.post('/view-unapproved-companies', CompanyController.viewUnapprovedCompany)
router.post('/search-company/:name', CompanyController.searchCompany)   //ADMIN, USERS
router.post("/find-company/:user_id", CompanyController.findCompany)
router.post("/update-company/:company_id/:field/:value", CompanyController.updateCompanyField)
router.post("/update-company-logo/:company_id", CompanyController.uploadLogo, CompanyController.updateCompanyLogo)
router.post("/add-test/:company_id", CompanyController.addTest)
router.post("/fetch-tests/:company_id", CompanyController.fetchTests)
router.post("/update-tests/:company_id", CompanyController.updateTest)

//JOB FUNCTIONS
router.post('/add-job/:company_id', JobController.addJob)       //EMPLOYER
router.post('/view-jobs', JobController.viewAllJobs)            //USER
router.post("/view-jobs/:company_id", JobController.viewCompanyJobs)
router.post('/search-job/:role', JobController.searchJob)       //USER
router.post('/remove-job/:id', JobController.deleteJob)         //EMPLOYER or Automatic(Application deadline)
router.post("/find-job/:job_id", JobController.findJob)

//APPLICATION FUNCTIONS
router.post("/apply-job/:user_id/:job_id", AppController.uploadResume, AppController.applyJob)  //USER
router.post("/view-apps/:company_id", AppController.viewApp)        //EMPLOYER
router.post("/view-myapps/:user_id", AppController.viewUserApp)     //USER
router.post("/find-app/:app_id", AppController.findApp)
router.post("/update-app/:app_id/:status", AppController.updateApp) //EMPLOYER
router.post("/update-status/:app_id/:status", AppController.updateStatus) //EMPLOYER
router.post("/schedule-tech-interview/:app_id", AppController.scheduleTechInterview) //EMPLOYER
router.post("/schedule-hr-interview/:app_id", AppController.scheduleHrInterview)
router.post("/submit-tech-score/:app_id", AppController.submitTechScore)



module.exports = router