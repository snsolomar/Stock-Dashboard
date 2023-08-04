require('dotenv').config();
const express = require('express');
const axios = require('axios');

// imported constants
const urlIntra = require('./constants/url');
const apiKey = require('./constants/apiKey')


const app = express()
const port = 3000


// init application
app.use(express.json());

app.get('/', (req, res) => {

    res.send('hello world')

});

/**
 * Fetches the details of a given company
*/

app.get('/stock/:stockSymbol', (req, res) => { 
    const stockSymbol = req.params.stockSymbol;
    const urlInfo = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSymbol}&apikey=${apiKey}`;
    
    axios.get(urlInfo, { 
        headers: {'User-Agent': 'request'}
    })
    .then((response) => {
        // Send the stock data as JSON
        res.json(response.data); 
    })
    .catch((err) => {
        console.error('Error:', err);
        res.status(500).send('An error occurred while fetching the data'); 
    });
});

/**
 * The endpoint we will use to get intraday stock data
*/

app.get('/stock', (req, res) => { 
    axios.get(urlIntra, { 
        headers: {'User-Agent': 'request'}
    })
    .then((response) => {
        // Send the stock data as JSON
        res.json(response.data); 
    })
    .catch((err) => {
        console.error('Error:', err);
        res.status(500).send('An error occurred while fetching the data'); 
    });
});




app.listen(port, () => {

console.log(`listening on port ${port}`)

});