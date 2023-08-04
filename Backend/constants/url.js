const apiKey = require('./apiKey');
const urlIntra = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${apiKey}`;
const urlInfo = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=${apiKey}`;

module.exports = urlIntra;
module.exports = urlInfo;