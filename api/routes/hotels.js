const express = require('express');
const router = express.Router();
const Hotel=require('../modals/Hotel.js');
const { createHotel, allHotel, findHotel, deleteHotel, updateHotel, countCity, countType, gteHotelrooms } = require('../controlers/hotelmethod.js');


//create
router.post('/', createHotel)
   /*
   async (req,res,next)=>{
     const newHotel =  new Hotel(req.body);  //m created a schema for adding or creating hotel
    try {
       const saved= await newHotel.save();  //saving the data in db 
        res.status(200).json(saved); //Respond with the saved hotel document as JSON data
    } catch (error) {
        next(error);
    }
}) */
//update
router.put('/:id', updateHotel)
//delete endpoint
router.delete('/:id',  deleteHotel)
//get endpoint
router.get('/find/:id',findHotel)
//get all endpoint

router.get('/', allHotel )

router.get('/countcity',countCity);
router.get('/typecount',countType);
router.get('/room/:id',gteHotelrooms);

module.exports = router;