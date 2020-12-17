const workRouter = require('express').Router();
const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  getWorkFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require('./db');

// GET /api/minions/:minionId/work to get an array of all work for the specified minon.
workRouter.get('/', (req, res, next) => {
    const workArr = getWorkFromDatabaseById(req.minion.id);
    res.status(200).send(workArr);
});

// POST /api/minions/:minionId/work to create a new work object and save it to the database.
workRouter.post('/', (req, res, next) => {
    const newWork = addToDatabase('work', req.body);
    res.status(201).send(newWork);
});

workRouter.param('workId', (req, res, next, id) => {
    // check valid Id
    const vaildIdInstance = getFromDatabaseById('work', id);
    if(vaildIdInstance){
        // req.work = vaildIdInstance;
        next();
    }
    else{
        res.status(404).send();
    }
});

function checkWorkIdAndMinionId(req, res, next){

    const minionId = req.minion.id;
    if(minionId !== req.body.minionId){
        res.status(400).send();
        return;
    }
    next();
}

// PUT /api/minions/:minionId/work/:workId to update a single work by id.
workRouter.put('/:workId', checkWorkIdAndMinionId, (req, res, next) => {
    const updatedWork = updateInstanceInDatabase('work', req.body);
    if(updatedWork){
        res.status(200).send(updatedWork);
    }
    else{
        res.status(404).send();
    }
});



// DELETE /api/minions/:minionId/work/:workId to delete a single work by id.
workRouter.delete('/:workId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('work', req.params.workId);
    if(deleted){
        res.status(204).send();
    }
    else{
        res.status(404).send();
    }
});



module.exports = workRouter;