const express = require('express');
const ideaRouter = express.Router();

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db.js');

ideaRouter.param('ideaId', (req, res, next, id) => {
    const validIdeaInstance = getFromDatabaseById('ideas', id);
    if(validIdeaInstance){
        req.idea = validIdeaInstance;
        next();
    }   
    else{
        res.status(404).send("Invalid idea ID");
    }
});


// GET /api/ideas to get an array of all ideas.
ideaRouter.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    res.status(200).send(ideas);
});

// POST /api/ideas to create a new idea and save it to the database.
ideaRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    if(req.body !== undefined){
        const newIdea = addToDatabase('ideas', req.body);
        res.status(201).send(newIdea);
    }
    else{
        res.status(400).send("new idea is empty");
    }
});

// GET /api/ideas/:ideaId to get a single idea by id.
ideaRouter.get('/:ideaId', (req, res, next) => {
    res.status(200).send(req.idea);
});


// PUT /api/ideas/:ideaId to update a single idea by id.
ideaRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.status(200).send(updatedIdea);
});

// DELETE /api/ideas/:ideaId to delete a single idea by id.
ideaRouter.delete('/:ideaId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if(deleted){
        res.status(204).send("Deleted!");
    }
    else{
        res.status(404).send("Not found this ID");
    }
});


module.exports = ideaRouter;