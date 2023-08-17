import React, { useContext } from 'react';
import Cards from './Cards';
import { mockCompanyDetails, mockCurrentQuote } from '../constants/mock';
import Header from './Header';
import Overview from './Overview';
import Details from './Details';

const Dashboard = () => {

  
  return (
    <div className='h-screen grid grid-cols-1 md:grid-cols-2 xl:grids-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand'>
      <div className='col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center'>
        <Header name={mockCompanyDetails.Name}></Header>
        </div>
      <div className='md:col-span-2 row-span-4'>
        <Cards></Cards>
        </div>
      <div>
        <Overview 
          symbol={mockCurrentQuote['Global Quote']['01. symbol']} 
          price={mockCurrentQuote['Global Quote']['05. price']}
          change={mockCurrentQuote['Global Quote']['09. change']}
          changePercent={mockCurrentQuote['Global Quote']['10. change percent']}
          currency={mockCompanyDetails.Currency}
        ></Overview>
        </div>
      <div className='row-span-2 xl-row-span-3'>
        <Details 
        details={mockCompanyDetails} 
        summary={mockCurrentQuote}
        ></Details>
        </div>
    </div>
  )
}

export default Dashboard
