
const collegeModel = require("../models/collegeModel")
const interModel = require("../models/internModel")

const validator = require("../validator/validator")

exports.createCollege = async function(req,res){

try {
  const data = req.body

  if(Object.keys(data).length==0)

   return res.status(400).send({status: false,message:"pls provide input"})

  let {name, fullName, logoLink} = data


if(!name){
   return res.status(400).send({status:false , msg: "name is mandatory" })
  }

  if(!fullName || fullName == ""){
    return res.status(400).send({status:false , msg: "fullName is mandatory" })
   }

   if(!logoLink){
    return res.status(400).send({status:false , msg: "logoLink is mandatory" })
   }


if(!validator.validateName(name)) {
  return res.status(400).send({status : false, msg : "please provide correct name"})
}

if(!validator.validatefullname(fullName)){
  return res.status(400).send({status:false , msg:"please enter valid full name"})
}

if(!validator.validateUrl(logoLink)){
  return res.status(400).send({status:false , msg: " please enter valid logoLink"})
 }

const uniqueName = await collegeModel.findOne({name:data.name})

       if(uniqueName){
 return res.status(400).send({status: false , msg: " name is already exist"})
}

     
  const saveCollege = await collegeModel.create(data)

  const result = await collegeModel.findById(saveCollege._id).select({ _id: 0, createdAt: 0, updatedAt:0,__v: 0});
  res.status(201).send({status:true ,data:result})

}catch (error) {

 return res.status(500).send({ status: false, msg: error.message });
}
}


//>===============================================================================//


exports.getCollegeData =async function(req,res){
  res.setHeader("Access-Control-Allow-Origin","*")

 try {

   let collegeName=req.query.collegeName
   if(!collegeName || collegeName.name == "" ){
    return res.status(400).send({status:false , msg: "provide college name in query"})
   }

   let getCollegeName= await  collegeModel.findOne({name:collegeName})
 
if(!getCollegeName){
    return res.status(404).send({status: false , msg: "no data found"})
}
   let getInternsData = await interModel.find({collegeId:getCollegeName._id}).select({name:1,email:1,mobile:1})
   

   let obj ={}
   obj.name=getCollegeName.name
   obj.fullName = getCollegeName.fullName
   obj.logoLink = getCollegeName.logoLink
   obj.interns = getInternsData

  return  res.status(200).send({status : true , data : obj})
}
  catch (error) {
   return res.status(500).send({status : false, msg : error.message})
 }
}











