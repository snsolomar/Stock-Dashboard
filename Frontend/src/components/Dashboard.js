import React, { useEffect, useState } from 'react';
// import Cards from './Cards';
import Header from './Header';
import Overview from './Overview';
import Details from './Details';
import Chart from './Chart';
import { mockDailyHistoricalData } from '../constants/mockdaily';
import FetchStockData from './FetchStockData';
import formatStockData from './formatStockData';



const Dashboard = () => {

  // Add state for the selected stock symbol
  const [selectedStockSymbol, setSelectedStockSymbol] = useState('');
  console.log(selectedStockSymbol);
  // Add state for storing company details
  const [companyDetails, setCompanyDetails] = useState({});
  // Add state for storing current quote
  const [currentQuote, setCurrentQuote] = useState({});
  const [selectedDateRange, setSelectedDateRange] = useState('intraday');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    
    const DevApi = process.env.REACT_APP_DEV_API_URL;

    // ${DevApi}
    if (selectedStockSymbol) {
        // Fetch the stock details from the server
        fetch(`${DevApi}/stock/${selectedStockSymbol}`, { signal: abortController.signal })
            .then(response => response.json())
            .then(data => {
                setCompanyDetails(data);
            })
            .catch(error => {
                if (error.name !== 'AbortError') {
                    console.error("Error fetching stock details:", error);
                }
            });

        fetch(`${DevApi}/stock/intraday/${selectedStockSymbol}`, { signal: abortController.signal })
            .then(response =>response.json())
            .then(data => {
              const formattedData = Object.entries(data["Time Series (5min)"]).map(([date, data]) => {
                return [
                  new Date(date).getTime(),  
                  parseFloat(data["4. close"])  
                ];
              }).reverse();
              setChartData(formattedData);
            })
            .catch(error => {
              if (error.name !== 'AbortError') {
                console.error("Error fetching intraday stock data:", error);
              }
            });

        fetch(`${DevApi}/searchCurrentQuote/${selectedStockSymbol}`, { signal: abortController.signal })
            .then(response => response.json())
            .then(data => {
              setCurrentQuote(data);
            })
            .catch(error => {
                if (error.name !== 'AbortError') {
                    console.error("Error fetching current stock quote:", error);
                }
            });
    }

    return () => {
        abortController.abort();
    };

}, [selectedStockSymbol]);



  // const chartData = Object.entries(mockDailyHistoricalData["Time Series (Daily)"]).map(([date, data]) => {
  //   return [
  //       new Date(date).getTime(),  // Convert date to timestamp
  //       parseFloat(data["4. close"])  // Convert closing price string to number
  //   ];
  // }).reverse();

  return (
    <div className='h-screen grid grid-cols-1 md:grid-cols-2 xl:grids-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand'>
      <div className='col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center'>
        <Header 
          name={companyDetails.Name}
          ticker={companyDetails.Symbol}
          onStockSelected={setSelectedStockSymbol} 
        >
        </Header>
        </div>
      <div className='md:col-span-2 row-span-4'>
        <Chart data={chartData}></Chart>
        </div>
      <div>
        <Overview 
            symbol={selectedStockSymbol || (currentQuote['Global Quote'] && currentQuote['Global Quote']['01. symbol'])}
            price={currentQuote['Global Quote'] && currentQuote['Global Quote']['05. price']}
            change={currentQuote['Global Quote'] && currentQuote['Global Quote']['09. change']}
            changePercent={currentQuote['Global Quote'] && currentQuote['Global Quote']['10. change percent']}
            currency={companyDetails.Currency}
        ></Overview>
        </div>
      <div className='row-span-2 xl-row-span-3'>
        <Details 
        details={companyDetails} 
        summary={currentQuote}
        ></Details>
        </div>
    </div>
  )
}

export default Dashboard
