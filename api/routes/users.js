const express = require('express');
const router = express.Router();
const {  allUser, findUser, deleteUser, updateUser } = require('../controlers/usermethod.js');
const { verifytoken, verifyuser, verifyadmin } = require('../rest/tokendetail.js');
/*
router.get("/checkauthentication", verifytoken, (req,res,next)=>{
  res.send("hello user, you are logged in")
 })

router.get("/checkuser/:id", verifyuser, (req,res,next)=>{
   res.send("hello user, you are logged in and you can delete your account")
 })

 router.get("/checkadmin/:id", verifyadmin, (req,res,next)=>{
   res.send("hello admin, you are logged in and you can delete all accounts")
 })
*/


 router.get("/checkuser/:id", verifyuser, (req,res,next)=>{
  res.send("hello user, you are logged in and you can delete your account")
})

//update


router.put('/:id', updateUser)
//delete endpoint
router.delete('/:id', deleteUser)
//get endpoint
router.get('/:id',findUser)
//get all endpoint

router.get('/', allUser )

module.exports = router;