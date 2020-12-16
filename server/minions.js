const express = require('express');
const minionsRouter = express.Router();

module.exports = minionsRouter;

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {

    const minionVaild = getFromDatabaseById('minions', id); // Returns the instance 
                                                            // with valid inputs and null with an invalid id.
    if(minionVaild){
        req.minion = minionVaild;
        next();
    }
    else{
        res.status(404).send();
    }
});


// GET /api/minions to get an array of all minions.
minionsRouter.get('/', (req, res, next) => {
     const allMinions = getAllFromDatabase('minions');
     if (allMinions !== null){
         res.send(allMinions);
     }
     else{
         res.status(404).send();
     }
});

// POST /api/minions to create a new minion and save it to the database.
minionsRouter.post('/', (req, res, next) => {
    const newMinionObj = req.body;
    if(newMinionObj !== undefined){
        const newMinion = addToDatabase('minions', newMinionObj);
        res.status(201).send(newMinion);
    }
});

// GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get('/:minionId', (req, res, next) => {
    res.status(200).send(req.minion);
});

// PUT /api/minions/:minionId to update a single minion by id..
minionsRouter.put('/:minionId', (req, res, next) => {

    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.status(200).send(updatedMinion);

});

// DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
    if(deleted){
        res.status(204).send("Deleted");
    }
    else{
        res.status(500).send("Id not found.");
    }
});
