var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//const saltRounds = 10;
const auth = require('./middleware/auth');

var monk = require('monk');
var db = monk('localhost:27017/illuminate');

// var tutorCollection = db.get('tutors');
// var userCollection = db.get('users');
var collection = db.get('users');
var collection1 = db.get('new-tutors');

router.get('/', function (req, res) {
  res.render('index', { title: 'Express' })
});



//protected route
router.get('/welcome', auth, function (req, res) {
  res.json({ message: "Welcome!!" });

});



router.post('/studentsignup', function (req, res) {


  const { name, email, ssignuppswd } = req.body;

  if (!(name && email && ssignuppswd)) {
    res.send({mess:"blank"});
  }
  else {
    collection.findOne({ email: email }, function (err, student) {
      if (err) throw err;

      if (student) {
        res.send({mess:'exists'})
      }
      else {

        const password = bcrypt.hashSync(ssignuppswd, 10);
        let newStudent = {
          name,
          email,
          password
        };
        collection.insert(newStudent, function (err, student) {
          if (err) throw err;

          var token = jwt.sign({ student_id: student._id, email }, 'secretkey');

          if (token) {
            student.token = token;
          }



          res.json(student);
        })
      }
    })
  }

});

router.post('/studentlogin', function (req, res) {
  // console.log(req.body)
  // const {email, sloginpswd} = req.body;

  // console.log('inside post request without an error"', function (err, video) {
  //   if (err) { console.log("inside post request with an error") };
  // })
  const email = req.body.email;
  const sloginpswd = req.body.sloginpswd;
  // console.log(req.body)

  // console.login('inside /studentlogin index.js of node')
  // console.log(email)
  // console.log(sloginpswd)
  try {
    if (!(email && sloginpswd)) {
      res.send({mess: "blank"});
      console.log('if')
    }
    else {
      console.log('inside')

      collection.findOne({ email: email }, function (err, student) {
        if (err) throw err;
        console.log(student);
        // const checkhashpassword = bcrypt.compareSync(sloginpswd, student.password);

        if (student == null) {
          res.send({mess: "incorrect"})
        }
        else {
          const checkhashpassword = bcrypt.compareSync(sloginpswd, student.password);
          console.log('Checking')
          console.log(sloginpswd)
          console.log(student.password)
          console.log(checkhashpassword)
          if (checkhashpassword) {
            var token = jwt.sign({ student_id: student._id, email, totalHours: student.totalHours}, 'secretkey');
            student.token = token;
            res.json(student);
            console.log('found user')
          }
          else {
            res.send({ mess: "incorrect" });
          }
        }
      }
	)};
	}
  catch (err) {
  console.log(err)
}
});





router.post('/tutorsignup', function (req, res) {

  const { name, email, tsignuppswd, phoneNo, image, location, aboutMe, details } = req.body;
  console.log('inside tutorsignup')

  if (!(name && email && tsignuppswd)) {
    res.send({mess:"blank"});
  }
  else {
    collection1.findOne({ email: email }, function (err, tutor) {
      if (err) throw err;

      if (tutor) {
        console.log(tutor)
        res.send({mess:"exists"})
      }
      else {
        const password = bcrypt.hashSync(tsignuppswd, 10);
        let newTutor = {
          name,
          email,
          password,
          phoneNo,
          image,
          location,
          aboutMe,
          details
        };
        collection1.insert(newTutor, function (err, tutor) {
          if (err) throw err;


          var token = jwt.sign({ tutor_id: tutor._id, email }, 'secretkey');

          if (token) {
            tutor.token = token;
          }



          res.json(tutor);
        })
      }
    })
  }

});

router.post('/tutorlogin', function (req, res) {

  const { email, tloginpswd } = req.body;

  if (!(email && tloginpswd)) {
    res.send({mess:"blank"});
  }
  else {

    collection1.findOne({ email: email }, function (err, tutor) {
      if (err) throw err;

      // const checkhashpassword = bcrypt.compareSync(tloginpswd, tutor.password);

      if (tutor == null) {
        res.send({mess:"incorrect"})
      }
      else {
        const checkhashpassword = bcrypt.compareSync(tloginpswd, tutor.password);
        if (checkhashpassword) {
          console.log(checkhashpassword)
          var token = jwt.sign({ tutor_id: tutor._id, email }, 'secretkey');
          tutor.token = token;
          res.json(tutor);
        }
        else {
          res.send({mess:"incorrect"});
        }
      }
    });

  }
});

module.exports = router;
