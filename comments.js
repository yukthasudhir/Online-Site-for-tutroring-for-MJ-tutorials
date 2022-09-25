var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/illuminate');

var collection = db.get('comments');

/* Index. All tutors displayed in api/Tutors */
router.get('/', function(req, res) {
  collection.find({},function(err, comments){
    if (err) throw err;
      res.json(comments);
  })
});

/* Show. Specific Tutor displayed by adding id of the tutor in api/Appointments/... */
router.get('/:tutorId/:courseId', function(req, res) {
    collection.find({tutorId: req.params.tutorId},function(err, comment){
      if (err) throw err;
    //   comment.map(com => {
    //     console.log('com' + com.tutorId)
    //       console.log('req' + req.params.tutorId)
    //       console.log(com.tutorId === req.params.tutorId)
    //       if(com.tutorId === req.params.tutorId)
    //       {
    //         //   res.json(com)
    //           console.log(com)
    //       }
    //   })
    // if(comment[0].courseId === req.params.tutorId){console.log('woohoo')}
      res.json(comment);
    })
  });

/* Create. Insert tutor in the collection using postman */
  router.post('/', function(req, res) {
    collection.insert({
      userId : req.body.userId,
      tutorId : req.body.tutorId,
      courseId : req.body.courseId,
      commentDescription : req.body.commentDescription

    },function(err, Appointment){
      if (err) throw err;
        res.json(Appointment);
    })
  });


  

module.exports = router;