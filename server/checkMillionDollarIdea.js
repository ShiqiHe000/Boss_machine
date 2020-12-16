const checkMillionDollarIdea = (req, res, next) => {
    const ideaValue = Number(req.body.numWeeks) * Number(req.body.weeklyRevenue);
    if(ideaValue < 1000000 || isNaN(ideaValue) || !req.body.numWeeks || !req.body.weeklyRevenue){
        res.status(400).send();
    }
    else{
        next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
