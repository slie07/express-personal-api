// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

var db = require('./models');


let profile = [
  {
    name: "Stevano Lie",
    github_link: "https://github.com/slie07",
    github_profile_image: "https://github.com/slie07",
    current_city: "Denver",
    pets: [{name: "Lucky", type: "Dog", breed: "Lab Mix"}]
  }
];

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    I_have_updated_the_api_endpoints: true, 
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://https://github.com/slie07/express-personal-api/blob/master/README.md", 
    base_url: "http://fierce-oasis-53784.herokuapp.com", 
    endpoints: [
       {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "My Profile"}, 
      {method: "GET", path: "/api/golfs", description: "This shows all of my golfs"},
      {method: "GET", path: "/api/golfs/:id", description: "This shows one golfs"},
      {method: "POST", path: "/api/golfs", description: "This creates a new golfs"},
      {method: "PUT", path: "/api/golfs/:id", description: "This updates a golfs"},
      {method: "DELETE", path: "/api/golfs/:id", description: "This deletes a golfs"},
    ]
  });
});

app.get('/api/profile', function(req, res) {
  res.json(profile);
});


// Show all golfs

app.get('/api/golfs', function (req, res) {
  db.Golfs.find().exec(function(err, golfs) {
    if (err) {return console.log("Index error: " + err); }
    res.json(golfs);
  });
});

// Show one golfs
app.get('/api/golfs/:id', function(req, res) {

  // res.json(req.params.id);

  db.Golfs.find({_id: req.params.id}, function(err, data) {
    res.json(data);
  });
});

app.post('/api/golfs', function(req, res) {
  var newGolf = new db.golf({
      surfaces: req.body.surfaces,
      equipments: req.body.equipments,
      distances: req.body.distances,
      power_ratio: req.body.power_ratio
  });


newGolf.save(function(err, golfs) {
  if (err) {
    return console.log("Error is: " + err);
    }
    console.log("Saved");
    res.json(golfs);
  });
});

// Update golf
app.put('/api/golfs/:id', function(req, res) {
  db.Golfs.findOne({_id: req.params.id}, function(err, golf) {
    if (err) {
      return console.log("Error is " + err);
    }
    golf.surfaces = req.body.surfaces;
    golf.equipments = req.body.equipments;
    golf.distances = req.body.distances;
    golf.power_ratio = req.body.power_ratio;
    golf.save();
    res.json(golfs);
  });
});

// Delete workout
app.delete('/api/golfs/:id', function(req, res) {
  var golfId = req.params.id;
  db.Golfs.findOneAndRemove({_id: golfId }, function(err, deletedGolf) {
    res.send("Golf was deleted!");
  });
});





/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
