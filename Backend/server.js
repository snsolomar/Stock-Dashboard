require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { pool } = require('./Modules/pool');

const watchlistFuncs = require('./Modules/WatchListFunctions/watchFunctions');

const alphavantage = require('./Modules/Alphavantage/alphaFunctions');

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
 * Fetches the stock prices based on rangeSelector
 * // Still Testing
*/

app.get('/stock/data/:stockSymbol', async (req, res) => {
    try {
        const { fromDate, toDate, interval } = req.query;

        // Based on interval (and possibly fromDate/toDate), decide which Alphavantage function to call
        let data;
        switch (interval) {
            case '5min':
                data = await alphavantage.fetchIntradayData(req.params.stockSymbol);
                break;
            case 'daily':
                data = await alphavantage.fetchDailyData(req.params.stockSymbol);
                break;
            case 'monthly':
                data = await alphavantage.fetchMonthlyData(req.params.stockSymbol);
                break;
            default:
                throw new Error('Invalid interval');
        }


        res.json(data);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('An error occurred while fetching the data');
    }
});


/**
 * The endpoint we will use to fetch Intraday stock data
*/

app.get('/stock/intraday/:stockSymbol', async (req, res) => {
    try {
        const response = await alphavantage.fetchIntradayData(req.params.stockSymbol);
        let daysAgo = 1;
        let filteredData = {};
        
        while (Object.keys(filteredData).length === 0 && daysAgo < 7) {
            const day = new Date();
            day.setDate(day.getDate() - daysAgo);
            const dateString = day.toISOString().split('T')[0];
            
            filteredData = Object.keys(response.data["Time Series (5min)"])
                .filter(timestamp => timestamp.startsWith(dateString))
                .reduce((obj, key) => {
                    obj[key] = response.data["Time Series (5min)"][key];
                    return obj;
                }, {});
                
            daysAgo++;
        }

        if (Object.keys(filteredData).length === 0) {
            res.status(404).send('No intraday data found for the past week');
            return;
        }
        
        response.data["Time Series (5min)"] = filteredData;
        res.json(response.data);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('An error occurred while fetching the data');
    }
});



/**
 * The endpoint we will use to fetch daily stock data
*/

// app.get('/stock/daily/:stockSymbol', (req, res) => {
//     alphavantage.fetchDailyData(req.params.stockSymbol)
//     .then((response) => {
//         res.json(response.data);
//     })
//     .catch((err) => {
//         console.error('Error:', err);
//         res.status(500).send('An error occurred while fetching the data'); 
//     });
// });

app.get('/stock/daily/:stockSymbol', async (req, res) => {
    try {
        const response = await alphavantage.fetchDailyData(req.params.stockSymbol);
        let daysAgo = 1;
        let filteredData = {};
        
        while (Object.keys(filteredData).length < 4 && daysAgo < 30) {
            const day = new Date();
            day.setDate(day.getDate() - daysAgo);
            const dateString = day.toISOString().split('T')[0];
            
            if (response.data["Time Series (Daily)"][dateString]) {
                filteredData[dateString] = response.data["Time Series (Daily)"][dateString];
            }
                
            daysAgo++;
        }

        if (Object.keys(filteredData).length === 0) {
            res.status(404).send('No daily data found for the past month');
            return;
        }
        
        response.data["Time Series (Daily)"] = filteredData;
        res.json(response.data);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('An error occurred while fetching the data');
    }
});


/**
 * The endpoint we will use to fetch monthly stock data
*/

// app.get('/stock/monthly/:stockSymbol', (req, res) => {
//     alphavantage.fetchMonthlyData(req.params.stockSymbol)
//     .then((response) => {
//         res.json(response.data);
//     })
//     .catch((err) => {
//         console.error('Error:', err);
//         res.status(500).send('An error occurred while fetching the data'); 
//     });
// });

app.get('/stock/monthly/:stockSymbol', async (req, res) => {
    try {
        const response = await alphavantage.fetchMonthlyData(req.params.stockSymbol);
        let monthsAgo = 1;
        let filteredData = {};
        
        while (Object.keys(filteredData).length < 6 && monthsAgo < 24) {
            const month = new Date();
            month.setMonth(month.getMonth() - monthsAgo);
            const monthString = month.toISOString().split('T')[0].substr(0, 7);
            
            if (response.data["Time Series (Monthly)"][monthString + "-01"]) {
                filteredData[monthString + "-01"] = response.data["Time Series (Monthly)"][monthString + "-01"];
            }
                
            monthsAgo++;
        }

        if (Object.keys(filteredData).length === 0) {
            res.status(404).send('No monthly data found for the past 2 years');
            return;
        }
        
        response.data["Time Series (Monthly)"] = filteredData;
        res.json(response.data);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('An error occurred while fetching the data');
    }
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
        const watchlists = await watchlistFuncs.getWatchlists()
        res.json(watchlists);
    } catch (error) {
        console.error('Error fetching watchlists:', error);
        res.status(500).send('Failed to fetch watchlists');
    }
});

/**
 * Updates watchlist name
*/

app.patch('/watchlist/:id/name', async (req, res) => {
    const watchListName = req.body.name;

    if (!watchListName) {
        return res.status(400).send('Name is required.');
    }

    try {
        const updateName = await watchlistFuncs.updateWatchlistNameById(req.params.id, watchListName);
        if (updateName){
            res.json({ message: "Watchlist name updated successfully!", name: updateName[0].name});
        } else {
            res.status(404).send("Watchlist not found.");
        }
    } catch (error) {
        console.error('Error updating watchlist name:', error);
        res.status(500).send('Failed to update watchlist name.');
    }
})

/**
 * Fetches selected stock from watchlists 
*/
app.get('/watchlist/:watchlistId/stocks', async (req, res) => {
    try {
        const getStocks = await watchlistFuncs.getStocksByWatchlistId(req.params.watchlistId)
        res.json(getStocks);
    } catch (error) {
        console.error('Error fetching stocks for the watchlist:', error);
        res.status(500).send('Failed to fetch stocks for the watchlist');
    }
});

app.listen(port, () => {

console.log(`listening on port ${port}`)

});