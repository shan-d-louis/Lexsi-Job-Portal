const userschema = require('../Models/UserSchema.js')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const uploadImage = multer({ storage: storage }).single("image");
const uploadPdf = multer({storage : storage}).single("pdf");

//REGISTER & LOGIN

const register = ((req,res) => {
    
    var user = new userschema({
        name : req.body.name,
        email : req.body.email,      
        password : req.body.password,
        contact : req.body.contact,
        image : req.file ? req.file : null,
        isAdminApproved : req.body.isAdminApproved ? req.body.isAdminApproved : false,
        isCompany : req.body.isCompany ? req.body.isCompany : false
    })
    user.save()
        .then((result) => {
            res.status(200).json({Msg : "Details saved",
                      data : result

            })
        })
        .catch((err) => {
            res.status(500).json({msg : 'Internal Server Error', error : err})
        })
})

const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password)

    userschema.findOne({email : email, password : password})
        .then((result) =>{
            if (result){
                if (result.isAdminApproved) {
                    res.status(200).json({
                        msg : "Admin Login Successful",
                        status : 200,
                        id : result._id
                    })
                }
                else {if (result.isCompany) {
                    res.status(200).json({
                        msg : "Company Login Successful",
                        status : 200,
                        id : result._id
                    })
                }
                else {
                    res.status(200).json({
                        msg : "User Login Successful",
                        status : 200,
                        id : result._id
                    })
                }}
            }
            else {
                res.status(200).json({
                    msg : "Invalid e-mail or password. Please try again",
                    status : 404
                })
            }
        })
        .catch ((err) => {
            res.status(500).json({msg : 'Internal Server Error', error : err})
        })
}

const resetPassword = (req,res) => {
    userschema.updateOne({email : req.params.email}, {$set : {password : req.body?.password}})
        .then((result) => {
            res.status(200).json({
                msg : "Password Reset Successfully",
                data : result
            })
        })
        .catch((err) => {
            res.status(500).json({msg : "Internal Server Error", error : err})
        })
}

// USER FUNCTIONS & USER HANDLING

const viewUsers = (req, res) => {
    userschema.find({isAdminApproved : false})
        .then((result) => {
            res.status(200).json({
                msg : "All Users Displayed Successfully",
                data : result
            })
        })
        .catch((err) => {
            console.log(err)
        })
}
const findUser = (req,res) => {
    userschema.find({_id : req.params.user_id})
        .then((result) => {
            res.status(200).json({
                msg : "User Details Found Successfully",
                data : result
            })
        })
        .catch((err) => {
            res.status(500).json({msg : 'Internal Server Error', error : err})
        })
}

const updateUserField = (req,res) => {             
    var update = {}
    update[req.params.field] = `${req.params.value}`

    userschema.updateOne({_id : req.params.user_id}, { $set : update})
        .then((result) => {
            res.status(200).json({
                msg : "Profile Updated Successfully",
                Data : result
            })
        })
        .catch((err) => {
            res.status(500).json({msg : 'Internal Server Error', error : err})
        })
}

const updateUserImage = (req, res) => {
    userschema.updateOne({_id : req.params.user_id}, {$set : {image : req.file}})
        .then((result) => {
            res.status(200).json({
                msg : "Profile Image Updated Successfully",
                data : result
            })
        })
        .catch ((err) => {
            res.status(500).json({msg : 'Internal Server Error', error : err})
        })
}

const deleteUser = (req, res) => {
    userschema.deleteOne({_id : req.params.id})
        .then((result) => {
            res.status(200).json({
                Message : "User Deleted Successfully",
                data : result
            })
        })
        .catch ((err) => {
            res.status(500).json({msg : 'Internal Server Error', error : err})
        })

}

module.exports = {register, resetPassword, viewUsers, uploadImage, uploadPdf, login,findUser, updateUserField, updateUserImage, deleteUser};