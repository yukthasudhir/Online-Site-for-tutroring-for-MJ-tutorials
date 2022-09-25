var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/illuminate');
var collection = db.get('new-tutors');


//base url: /tutors

router.get('/', function(req, res) {
	collection.find({}, function(err, tutors){
		if (err) throw err;
	  	res.json(tutors);
	});
});

router.get('/:id/:subjectId', function(req, res) {
	collection.find({ _id: req.params.id}, {projection: {_id: 0, course: 1}}, function(err, courses){
		if (err) throw err;
		res.json(courses)
	});
});

router.get('/:id', function(req, res) {
	collection.find({ _id: req.params.id}, function(err, tutors){
		if (err) throw err;
	  	res.json(tutors);
	});
});

//insert
router.post('/', function(req, res) {
	collection.insert({
		name: req.body.name,
		rating: req.body.rating,
		aboutMe: req.body.aboutMe,
		details: [req.body.details],
		course: [req.body.course]

	}, function(err, video){
		if (err) throw err;
	  	res.json(video);
	});
});

//update
router.put('/:id', function(req, res) {
	collection.update({ _id: req.params.id }, { $set: { 
		title: req.body.title,
		genre: req.body.genre,
		description: req.body.desc

	 }},  function(err, video){
		if (err) throw err;
	  	res.json(video);
	});
});

//delete
router.delete('/:id', function(req, res) {
	collection.remove({ _id: req.params.id }, function(err, video){
		if (err) throw err;
	  	res.json(video);
	});
});

module.exports = router;
