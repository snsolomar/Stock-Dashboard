import React, { useEffect, useState } from 'react';
import Header from './Header';
import Overview from './Overview';
import Details from './Details';
import Chart from './Chart';
import FetchStockData from '../utils/helperFunctions/FetchStockData';
import FetchCurrentQuote from '../utils/helperFunctions/FetchCurrentQuote';
import FetchStockDetails from '../utils/helperFunctions/FetchStockDetails';
import FetchDateRangeData from '../constants/FetchDateRangeData';
import formatStockData from '../constants/FormatStockData';

const Dashboard = () => {
  const [selectedStockSymbol, setSelectedStockSymbol] = useState('');
  const [companyDetails, setCompanyDetails] = useState({});
  const [currentQuote, setCurrentQuote] = useState({});
  const [selectedDateRange, setSelectedDateRange] = useState('intraday');
  const [chartData, setChartData] = useState([]);
  const [intradayData, setIntradayData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  // Fetching chart data based on selected date range and stock symbol
  useEffect(() => {
    // This is where we'll fetch and format the data for each date range
    const fetchData = async () => {
      const intradayRaw = await FetchStockData(selectedStockSymbol, "1D");
      const dailyRaw = await FetchStockData(selectedStockSymbol, "1M");
      const monthlyRaw = await FetchStockData(selectedStockSymbol, "1Y");

      setIntradayData(intradayRaw);
      setDailyData(dailyRaw);
      setMonthlyData(monthlyRaw);
    };

    fetchData();
}, [selectedStockSymbol]);

  // Fetching stock details and current quotes based on selected stock symbol
  useEffect(() => {
  const abortController = new AbortController();

  if (selectedStockSymbol) {
      // Fetch the stock details from the server
      FetchStockDetails(selectedStockSymbol, abortController.signal)
        .then(data => {
            setCompanyDetails(data);
        })
        .catch(error => {
            console.error("Error fetching stock details:", error);
        });
      
      // Fetch the stock quote from the server
      FetchCurrentQuote(selectedStockSymbol, abortController.signal)
        .then(data => {
            setCurrentQuote(data);
        })
        .catch(error => {
            console.error("Error fetching current stock quote:", error);
        });
  }

  return () => {
      abortController.abort();
  };
}, [selectedStockSymbol]);

const getDataForSelectedRange = () => {
  switch (selectedDateRange) {
    case '1D':
      return intradayData;
    case '1M':
      return dailyData;
    case '1Y':
      return monthlyData;
    default:
      return [];
  }
};



  return (
    <div className='h-screen grid grid-cols-1 md:grid-cols-2 xl:grids-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand'>
      <div className='col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center'>
        <Header 
          name={companyDetails.Name}
          ticker={companyDetails.Symbol}
          onStockSelected={setSelectedStockSymbol} 
        />
      </div>
      <div className='md:col-span-2 row-span-4'>
        <Chart data={getDataForSelectedRange()} onRangeSelected={setSelectedDateRange} />
      </div>
      <div>
        <Overview 
            symbol={selectedStockSymbol || (currentQuote['Global Quote'] && currentQuote['Global Quote']['01. symbol'])}
            price={currentQuote['Global Quote'] && currentQuote['Global Quote']['05. price']}
            change={currentQuote['Global Quote'] && currentQuote['Global Quote']['09. change']}
            changePercent={currentQuote['Global Quote'] && currentQuote['Global Quote']['10. change percent']}
            currency={companyDetails.Currency}
        />
      </div>
      <div className='row-span-2 xl-row-span-3'>
        <Details 
        details={companyDetails} 
        summary={currentQuote}
        />
      </div>
    </div>
  )
}

export default Dashboard;

