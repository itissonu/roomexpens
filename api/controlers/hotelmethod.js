const Hotel = require('../modals/Hotel.js');
const Room = require('../modals/Room.js');

async function createHotel(req,res,next){
    const newHotel =  new Hotel(req.body);  //m created a schema for adding or creating hotel

    

    try {
       const saved= await newHotel.save();  //saving the data in db 
        res.status(200).json(saved); //Respond with the saved hotel document as JSON data
    } catch (error) {
        next(error);
    }
}
async function updateHotel(req,res,next){
    try {
        const updated= await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{ new: true })  //findByIdAndUpdate() is a Mongoose method used to find a document by its ID (req.params.id) and update it with the properties specified in req.body. The $set operator is used to specify the update operation.
         res.status(200).json(updated); //
     } catch (error) {
         next(error);
     }
}
async function deleteHotel(req,res,next){
    try {
        await Hotel.findByIdAndDelete(req.params.id)  
        res.status(200).json('hotel has been deleted'); //
    } catch (error) {
        next(error);
    }
}
async function findHotel(req,res,next){
    try {
        const wantedhotel=  await Hotel.findById(req.params.id)  
          res.status(200).json(wantedhotel); //
      } catch (error) {
          next(error);
      }
}
async function allHotel(req,res,next){                       //this end point will fetch the filteed price hotels(min and max given)
   const{min,max,...otherdata}=req.query;
    try {
        
        
        const wantedhotels=  await Hotel.find({
            ...otherdata,                                               //we need max,min and also the other details so spread op.
            chepeastprice:{$gt:min |1, $lt:max||1000}               //gt and lt is greaterthan and smaller than in mongodb
        }).limit(parseInt(req.query.limit));
                       
          res.status(200).json(wantedhotels);
           //
      } catch (error) {
          next(error);
      }
}

 async function countCity(req,res,next){
      const cities= req.query.cities.split(",")   //to separate the cityname and store in an array
 try {
      const citylist= await Promise.all(cities.map((city)=>{
        return Hotel.countDocuments({city:city});
      })
      );
 res.status(200).json(citylist)
 } catch (error) {
    next(error)
 }
    }
    async function countType(req, res, next) {
        try {
          const hotelCount = await Hotel.countDocuments({ type: "hotel" });
          const apartmentCount = await Hotel.countDocuments({ type: "apartments" });
          const resortCount = await Hotel.countDocuments({ type: "resorts" });
          const villaCount = await Hotel.countDocuments({ type: "villas" });
          const cabinCount = await Hotel.countDocuments({ type: "cabins" });
      
          const counts = [
            { type: "hotel", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount },
          ];
      
          res.status(200).json(counts);
        } catch (err) {
          // Handle the error here
          console.error("Error in countType:", err);
          res.status(500).json({ message: "Internal Server Error" });
        }
      };

      async function gteHotelrooms(req,res,next){
         try {
            const hotel=await Hotel.findById(req.params.id);
            const list= await Promise.all(hotel.rooms.map((room)=>{
return Room.findById(room)
            }))
            res.status(200).json(list)
         } catch (error) {
            next(error)
         }
      }
      
module.exports = {
    createHotel,
    countCity,
    countType,
    updateHotel,
    deleteHotel,
    findHotel,
    allHotel,
    gteHotelrooms,
  };