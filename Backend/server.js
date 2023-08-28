require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { pool } = require('./Modules/pool');

// Now you can use the pool for your database operations


const alphavantage = require('./Modules/alphavantage');

// init express and port
const app = express()
const port = 3001

// init application
app.use(express.json());
app.use(cors());

// dev test
app.get('/', (req, res) => {

    res.send('hello world')

});

/**
 * Fetches the details of a given company
*/

app.get('/stock/:stockSymbol', (req, res) => { 
  alphavantage.fetchCompanyDetails(req.params.stockSymbol)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      console.error('Error:', err);
      res.status(500).send('An error occurred while fetching the data'); 
    });
});

/**
 * The endpoint we will use to get Intraday stock data
*/

app.get('/stock', (req, res) => {
    alphavantage.fetchIntradayData(req.params.stockSymbol)
    .then((response) => {
        res.json(response.data);
    })
    .catch((err) => {
        console.error('Error:', err);
        res.status(500).send('An error occurred while fetching the data'); 
    });
});

/**
 * Fetches stock symbols based on the search query
 */

app.get('/searchResults/:query', (req, res) => {
    alphavantage.searchStocks(req.params.query)
    .then((response) => {
        res.json(response.data);
    })
    .catch((err) => {
        console.error('Error:', err);
        res.status(500).send('An error occurred while fetching the data');
    });
});

/**
 * Fetches current stock quote based on the search query
 */

app.get('/searchCurrentQuote/:query', (req, res) => {
    alphavantage.searchCurrentQuote(req.params.query)
    .then((response) => {
        res.json(response.data);
    })
    .catch((err) => {
        console.error('Error:', err);
        res.status(500).send('An error occurred while fetching the data');
    });
});

/**
 * Fetches current all watchlists in the database
*/
app.get('/watchlist', async (req, res) => {
    try {
        const result = await pool.query('SELECT name FROM Watchlist');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching watchlists:', error);
        res.status(500).send('Failed to fetch watchlists');
    }
});

/**
 * Fetches selected stock from watchlists 
*/
app.get('/watchlist/:watchlistId/stocks', async (req, res) => {
    const watchlistId = req.params.watchlistId;

    try {
        const query = 'SELECT name, symbol FROM watchlist_stocks WHERE watchlist_id = $1';
        const values = [watchlistId];
        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching stocks for the watchlist:', error);
        res.status(500).send('Failed to fetch stocks for the watchlist');
    }
});

app.listen(port, () => {

console.log(`listening on port ${port}`)

});