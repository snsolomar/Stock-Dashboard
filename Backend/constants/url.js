const apiKey = require('./apiKey');
const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${apiKey}`;

module.exports = url;