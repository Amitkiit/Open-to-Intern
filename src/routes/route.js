const express = require('express')

const router =  express.Router()


const collegeController = require('../controllers/collegeController')
const internController = require("../controllers/internController")


router.post('/functionup/colleges', collegeController.createCollege)

router.post('/functionup/interns',internController.createInterns)

router.get('/functionup/collegeDetails', collegeController.getCollegeData)

router.all('*/',(req,res)=>{
    res.status(400).send({status:false,message:"path invalid"})
}

)


module.exports = router
