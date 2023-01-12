
const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");
const validator = require("../validator/validator")

exports.createInterns = async function(req,res){
try {

const data = req.body

      if(Object.keys(data).length ==0){
return res.status(400).send({status: false , msg: "please provide Input"})
}

const {name , email , mobile, collegeName} = data

    if(!name){ 
        return res.status(400).send({status: false , msg: "provide your name"})
    }
    if(!email){ 
        return res.status(400).send({status: false , msg: "provide your email"})
    }
    if(!mobile){ 
        return res.status(400).send({status: false , msg: "provide your mobile"})
    }
    
    if(!collegeName || collegeName == ""){ 
        return res.status(400).send({status: false , msg: "Please Provide Your CollegeName"})
    }


    if(!validator.validateInName(name)) {
        return res.status(400).send({status : false, msg : "please provide correct name " })
    }

    if(!validator.validateEmail(email)) {
        return res.status(400).send({status : false, msg : "please provide correct Email"})
    }

    if(!validator.validateMobile(mobile)) {
        return res.status(400).send({status : false, msg : "Please use correct Mobile Number"})
    }
    
    
    const uniqueEmail = await internModel.findOne({email: data.email})
    
    if(uniqueEmail){
        return res.status(400).send({status: false , msg: "email is already exist"})
    }

    
    const uniqueMobile = await internModel.findOne({mobile: data.mobile})
    if (uniqueMobile) {
        return res.status(400).send({status:true , msg:"This mobile no is already exist"})

    }
    
     const getCollegeId = await collegeModel.findOne({name : data.collegeName})
     data.collegeId = getCollegeId._id
    
     const saveInterns = await internModel.create(data)

     const result = await internModel.findById(saveInterns._id).select({ _id: 0, createdAt: 0, updatedAt:0,__v: 0});
    
    res.status(201).send({status:true, data:result})
}
    
 catch (error) {
    return res.status(500).send({status : false , msg : error.message})
}
}

