var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/illuminate');
var collection = db.get('users');


/* GET users listing. */
//base url: /users
router.get('/', function(req, res) {
	collection.find({}, function(err, tutors){
		if (err) throw err;
	  	res.json(tutors);
	});
});

router.get('/:id', function(req, res) {
	collection.find({ _id: req.params.id}, function(err, tutors){
		if (err) throw err;
	  	res.json(tutors);
	});
});

module.exports = router;
