const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  motion: Boolean,
  temperature: Number,
  lights: String,
  windows: String,
  override: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Event', eventSchema);