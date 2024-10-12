const mongoose = require('mongoose');

// Define the schema
const stationSchema = new mongoose.Schema({
  line: Number,
  number: String,
  name: String,
  latitude: Number,
  longitude: Number,
});

const Station = mongoose.model('Station', stationSchema);

module.exports = Station;