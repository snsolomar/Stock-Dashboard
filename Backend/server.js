require('dotenv').config();
const express = require('express');
const axios = require('axios');


const app = express()
const port = 3000
const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
// Symbol is set to IBM; Refactor so symbol is a const
// Function only tracks intraday trading. Suggest creating separate urls for daily, monthly, and yearly endpoints
const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${apiKey}`;


app.use(express.json());

app.get('/', (req, res) => {

    res.send('hello world')

});

// The endpoint we will use to get stock data
app.get('/stock', (req, res) => { 
    axios.get(url, { 
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