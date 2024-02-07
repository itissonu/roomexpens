const Room=require('../modals/Room.js');
const Hotel = require('../modals/Hotel.js');



async  function createRoom(req,res,next){
  const hotelid=req.params.hotelid;      //from user input of which hotel
  const newroom= new Room(req.body);       //req.body will have all the details like number  availibility ..
try {
    const saved= await newroom.save();
    try {
        await Hotel.findByIdAndUpdate(
            hotelid
            ,{$push:{rooms:saved._id}})     //it will save the room id int he hotel's rooms array
        
    } catch (error) {
        next(error)
    }
    res.status(200).json(saved)
} catch (error) {
    next(error)
}
}

async  function updateRoom (req,res,next){
    try {
        const updatedroom= await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updatedroom);
    } catch (error) {
        next(error)
    }

}

async function deleteRoom(req,res,next){

    const hotelid= req.params.hotelid;
    try {
         
        await Room.findByIdAndDelete(req.params.id);
        try {
           await Hotel.findOneAndUpdate( 
            { _id: hotelid },               //Query to find the hotel by its ID
            {$pull:{rooms:req.params.id}},);        // Update to remove the room ID
        } catch (error) {
            next(error)
        }
        res.status(201).json("room deleted successfully");
    } catch (error) {
        next(error)
    }

}

async function  findRoom (req,res,next){

    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
      } catch (err) {
        next(err);
      }


}

async function allRoom (req,res,next){
    try {
        const allroom = await Room.find();
        res.status(200).json(allroom);
      } catch (err) {
        next(err);
      }
}
 async function updateRoomAvailability(req, res, next) {
    try {
      await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates  
           
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(err);
    }
   
  };
module.exports = {
    createRoom,
    updateRoom,
    deleteRoom,
    findRoom,
    allRoom,
    updateRoomAvailability,
  };