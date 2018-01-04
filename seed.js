// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

// var db = require('./models');

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })

let db = require('./models');

let golf_list = [
	{
		surfaces: "Green",
  		equipments: "Putter",
  		distances: 0,
  		power_ratio: "Low"
	},
	{
		surfaces: "Rough",
		equipments: "Wedge",
		distances: 70,
		power_ratio: "Medium"
	}
];