const express = require('express');
const { createRoom, updateRoom, deleteRoom, findRoom, allRoom, updateRoomAvailability } = require('../controlers/roommethod');
const router = express.Router();
const Room=require('../modals/Room.js');


//create
router.post('/:hotelid', createRoom)
  
//update
router.put('/:id', updateRoom)
//delete endpoint
router.delete('/:id/:hotelid',  deleteRoom)
//get endpoint
router.get('/:id',findRoom)
//get all endpoint

router.put("/availability/:id", updateRoomAvailability);

router.get('/', allRoom )
module.exports = router;