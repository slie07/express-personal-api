var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var GolfSchema = new Schema({
  surfaces: String,
  equipments: String,
  distances: Number,
  power_ratio: String
 });

var Golf = mongoose.model('Golf', GolfSchema);

module.exports = Golf;