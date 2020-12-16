const meetingRouter = require('express').Router();

const {
  createMeeting,
  getAllFromDatabase,
  deleteAllFromDatabase,
  addToDatabase
} = require('./db');

// GET /api/meetings to get an array of all meetings.
meetingRouter.get('/', (req, res, next) => {
    const meetingArr = getAllFromDatabase('meetings');
    res.status(200).send(meetingArr);
});


// POST /api/meetings to create a new meeting and save it to the database.
meetingRouter.post('/', (req, res, next) => {
    const newMeeting = createMeeting();
    const newMeetingToAdd = addToDatabase('meetings', newMeeting);
   res.status(201).send(newMeetingToAdd);
});


// DELETE /api/meetings to delete all meetings from the database.
meetingRouter.delete('/', (req, res, next) => {
    const deletedArr = deleteAllFromDatabase('meetings');
    if(deletedArr.length === 0){
        res.status(204).send("Deleted all meeting");
    }
    else{
        res.status(404).send('Meetings not found');
    }
});


module.exports = meetingRouter;