require('dotenv').config();
const express = require('express');
const axios = require('axios');


const app = express()
const port = 3000
const apiKey = process.env.FINNHUB_API_KEY;
const basePath = "https://finnhub.io/api/v1";


app.use(express.json());

app.get('/', (req, res) => {

    res.send('hello world')

});

/**
    *Searches for stock matches based on user's query
    * @param {string} query 
    * @returns {Promise<Object[]>}
*/

app.get('/search/:symbol', async (req, res) => {
    try {
        const symbol = req.params.symbol;
        const url = `${basePath}/search?q=${symbol}&token=${apiKey}`;
        const response = await axios.get(url);

        if (response.data.result) {
            res.json(response.data.result);
        } else {
            res.status(404).json({ message: 'Symbol not found' });
        }
    } catch (error) {
        console.error(`An error has occurred: ${error}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

/**
 * Fetches the details of a given company
 * @param {string} stockSymbol - Symbol of the company, e.g. 'FB'
 * @returns {Promise<Object>} Response object
 */

app.get('/stock/:stockSymbol', async (req, res) => {
  const stockSymbol = req.params.stockSymbol;
  const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=${process.env.FINNHUB_API_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(`An error has occurred: ${error.response ? error.response.status : error.message}`);
    res.status(500).send('An error has occurred, please try again');
  }
});




app.listen(port, () => {

console.log(`listening on port ${port}`)

});