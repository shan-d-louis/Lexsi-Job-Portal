const CompanySchema = require("../Models/CompanySchema.js")
const multer = require("multer");
const UserSchema = require("../Models/UserSchema.js");

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, "./Uploads");
    },
    filename: (req, file, cb) => {
        const prefix = "logo-";
        const fullName = file.originalname;
        const extension = file.originalname.split(".").pop();
        const fileName = prefix + fullName.substring(0, fullName.lastIndexOf(".")) + Date.now() + "." + extension;
        cb(null, fileName);
    }
})

const uploadLogo = multer({storage : storage}).single("logo")

const registerCompany = (req, res) => {
    
    var company = new CompanySchema({
        user_id : req.params.user_id,
        name : req.body.name,
        logo : req.file ? req.file : null,
        industry : req.body.industry,
        province : req.body.province,
        country : req.body.country,
        website : req.body.website,
        desc : req.body.desc
    })
    company.save()
        .then((result) => {
            res.status(200).json({
                Message : "Company Added Successfully",
                data : result
            })
        })
        .catch((err) => {
            res.status(500).json({msg : 'Internal Server Error', error : err})
        })

}

const approveCompany = async (req, res) => {
    try {
        await UserSchema.updateOne({ _id: req.params.user_id },{ $set: { isCompany: true } });

        const result = await CompanySchema.updateOne({ _id: req.params.company_id },{ $set: { approved: true } });

        res.status(200).json({
            message: "Company Approved",
            data: result
        });

    } catch (err) {
        res.status(500).json({message: "Internal Server Error",error: err});
    }
};


const deleteCompany = (req, res) => {
    CompanySchema.updateOne({_id : req.params.id}, {$set : {approved : false}})
        .then((result) => {
            res.status(200).json({
                Message : "Company Removed Successfully",
                data : result
            })
        })
        .catch ((err) => {
            res.status(500).json({msg : 'Internal Server Error', error : err})
        })

}

const viewAllCompany = (req,res) => {

    CompanySchema.find({approved : true})
        .then((result) => {
            res.status(200).json({
                Message : "Companies viewed successfully",
                data : result
            })
        })
        .catch ((err) => {
            res.status(500).json({msg : 'Internal Server Error', error : err})
        })
}

const viewUnapprovedCompany = (req,res) => {

    CompanySchema.find({approved : false})
        .then((result) => {
            res.status(200).json({
                Message : "Companies viewed successfully",
                data : result
            })
        })
        .catch ((err) => {
            res.status(500).json({msg : 'Internal Server Error', error : err})
        })
}


const searchCompany = (req,res) => {
    CompanySchema.find({name : {$regex : req.params.name, $options : 'i'}, approved : true})
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

const findCompany = (req, res) => {
    CompanySchema.find({user_id : req.params.user_id}).populate("user_id")
        .then((result) => {
            res.status(200).json({
                msg : "Company found successfully",
                data : result
            })
        })
        .catch((err) => {
            res.status(500).json({msg : 'Internal Server Error', error : err})
        })
}

const updateCompanyField = (req,res) => {             
    var update = {}
    update[req.params.field] = `${req.params.value}`

    CompanySchema.updateOne({_id : req.params.company_id}, { $set : update})
        .then((result) => {
            res.status(200).json({
                msg : "Company Details Updated Successfully",
                Data : result
            })
        })
        .catch((err) => {
            res.status(500).json({msg : 'Internal Server Error', error : err})
        })
}

const updateCompanyLogo = (req, res) => {
    const logo = req.file
    CompanySchema.updateOne({_id : req.params.company_id}, {$set : {logo : logo}})
        .then((result) => {
            res.status(200).json({
                msg : "Company Logo Updated Successfully",
                data : result
            })
        })
        .catch ((err) => {
            res.status(500).json({msg : 'Internal Server Error', error : err})
        })
}

const addTest = async (req, res) => {
    try {
    const result = await CompanySchema.updateOne({_id : req.params.company_id}, {$push : {tests : req.body}})

    res.status(200).json({
        msg : "Test Added Successfully",
        data : result,
        company_id : req.params.company_id
    })
    } catch (err) {
        res.status(500).json({msg : "Internal Server Error"})
    }
}

const fetchTests = async (req, res) => {
    try{
    const result = await CompanySchema.findOne({_id : req.params.company_id})
    res.status(200).json({
        msg : "Tests Fetched Successfully",
        data : result
    })
    } catch(err) {
        res.status(500).json({msg : "Internal Server Error"})
    }   
}

const updateTest = async (req,res) => {
    const oldData = await CompanySchema.findOne({_id : req.params.company_id})
    var tests = [...oldData?.tests]
    for (var i = 0; i < tests.length; i++){
        if (tests[i]?.name == req.body?.name){
            tests[i] = req.body
        } 
    }

    try {
    const result = await CompanySchema.updateOne({_id : req.params.company_id}, {$set : {tests : tests}})
    res.status(200).json({
        msg : "Test Updated Successfull",
        data : result
    })
    } catch (err) {
        res.status(500).json({msg : "Internal Server Error"})
    }
}
module.exports = {uploadLogo, registerCompany, viewAllCompany, viewUnapprovedCompany, searchCompany, deleteCompany, approveCompany, findCompany, updateCompanyField, updateCompanyLogo, addTest, fetchTests, updateTest}