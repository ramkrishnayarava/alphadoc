const mongoose = require('mongoose');
const IntradayDataSchema = new mongoose.Schema({
    timestamp: { type: Date, required: true },
    open: { type: Number, required: true },
    high: { type: Number, required: true },
    low: { type: Number, required: true },
    close: { type: Number, required: true },
    volume: { type: Number, required: true },
  }, {strict: true});

  module.exports = mongoose.model('intraday_data', IntradayDataSchema);
