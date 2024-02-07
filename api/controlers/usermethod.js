const User = require('../modals/User.js');


async function updateUser(req,res,next){
    try {
        const updated= await User.findByIdAndUpdate(req.params.id,{$set:req.body},{ new: true })  //findByIdAndUpdate() is a Mongoose method used to find a document by its ID (req.params.id) and update it with the properties specified in req.body. The $set operator is used to specify the update operation.
         res.status(200).json(updated); //
     } catch (error) {
         next(error);
     }
}
async function deleteUser(req,res,next){
    try {
        await User.findByIdAndDelete(req.params.id)  
        res.status(200).json('User has been deleted'); //
    } catch (error) {
        next(error);
    }
}
async function findUser(req,res,next){
    try {
        const wantedUser=  await User.findById(req.params.id)  
          res.status(200).json(wantedUser); //
      } catch (error) {
          next(error);
      }
}
async function allUser(req,res,next){
    try {
        const wantedUsers=  await User.find()  
          res.status(200).json(wantedUsers); //
      } catch (error) {
          next(error);
      }
}
module.exports = {
    
    updateUser,
    deleteUser,
    findUser,
    allUser,
  };