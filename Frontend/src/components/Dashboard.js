import React, { useEffect, useState } from 'react';
import Header from './Header';
import Overview from './Overview';
import Details from './Details';
import Chart from './Chart';
import FetchStockData from '../utils/helperFunctions/FetchStockData';
import FetchCurrentQuote from '../utils/helperFunctions/FetchCurrentQuote';
import FetchStockDetails from '../utils/helperFunctions/FetchStockDetails';
import FetchDateRangeData from '../constants/FetchDateRangeData';

const Dashboard = () => {
  const [selectedStockSymbol, setSelectedStockSymbol] = useState('');
  const [companyDetails, setCompanyDetails] = useState({});
  const [currentQuote, setCurrentQuote] = useState({});
  const [selectedDateRange, setSelectedDateRange] = useState('intraday');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    if (selectedStockSymbol) {
        FetchStockData(selectedDateRange, selectedStockSymbol, setChartData);
        

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
  }, [selectedStockSymbol, selectedDateRange]);

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
        <Chart data={chartData} onRangeSelected={setSelectedDateRange} />
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

