var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/illuminate');

var collection = db.get('appointments');

/* Index. All tutors displayed in api/Tutors */
router.get('/', function(req, res) {
  collection.find({},function(err, Appointments){
    if (err) throw err;
      res.json(Appointments);
  })
});

/* Show. Specific Tutor displayed by adding id of the tutor in api/Appointments/... */
router.get('/:id', function(req, res) {
    collection.find({tutorId: req.params.id },function(err, Appointment){
      if (err) throw err;
        res.json(Appointment);
    })
  });


/* Create. Insert tutor in the collection using postman */
  router.post('/', function(req, res) {
    collection.insert({
      userId : req.body.userId,
      userName : req.body.userName,
      userEmail : req.body.userEmail,
      tutorId : req.body.tutorId,
      // tutorName : req.body.tutorName,
      // tutorEmail : req.body.tutorEmail,
      courseId : req.body.courseId,
      courseName : req.body.courseName,
      date : req.body.date,
      time : req.body.time,
      isScheduled : req.body.isScheduled

    },function(err, Appointment){
      if (err) throw err;
      res.json(Appointment);
    })
  });

/* Destroy. Delete specific Tutor by adding id of the tutor in api/Tutors/... */
router.delete('/:id', function(req, res) {
    collection.remove({_id: req.params.id },function(err, Appointment){
      if (err) throw err;
        res.json(Appointment);
    })
  });
  

module.exports = router;