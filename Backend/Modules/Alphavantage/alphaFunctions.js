// alphavantage.js abstracts the specific details of the Alphavantage API, which will help in organizing code

const axios = require('axios');

const BASE_URL = 'https://www.alphavantage.co/query';
const apiKey = require('../../constants/apiKey');

// Abstract the common axios call, so you don't repeat headers and other common parameters
function fetchFromAlphavantage(endpoint, params) {
    return axios.get(BASE_URL + endpoint, {
        headers: { 'User-Agent': 'request' },
        params: {
            ...params,
            apikey: apiKey
        }
    });
}

function fetchCompanyDetails(stockSymbol) {
    return fetchFromAlphavantage('', {
        function: 'OVERVIEW',
        symbol: stockSymbol
    });
}

function fetchIntradayData(stockSymbol) {
    return fetchFromAlphavantage('', {
        function: 'TIME_SERIES_INTRADAY',
        symbol: stockSymbol,
        interval: '5min'
    });
}

function fetchDailyData(stockSymbol) {
    return fetchFromAlphavantage('', {
        function: 'TIME_SERIES_DAILY',
        symbol: stockSymbol
    });
}

function fetchMonthlyData(stockSymbol) {
    return fetchFromAlphavantage('', {
        function: 'TIME_SERIES_MONTHLY',
        symbol: stockSymbol
    });
}

function searchStocks(query) {
    return fetchFromAlphavantage('', {
        function: 'SYMBOL_SEARCH',
        keywords: query
    });
}

function searchCurrentQuote(query) {
    return fetchFromAlphavantage('', {
        function: 'GLOBAL_QUOTE',
        symbol: query
    });
}

module.exports = {
    fetchCompanyDetails,
    fetchIntradayData,
    fetchDailyData,
    fetchMonthlyData,
    searchStocks,
    searchCurrentQuote
};
