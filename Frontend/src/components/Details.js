import React from 'react';
import Cards from './Cards';

const Details = ({ details }) => {
   const CompanyLists = ({ details }) => {
      const companyDetails = {
         name: details.Name,
         country: details.Country,
         currency: details.Currency,
         exchange: details.Exchange,
         sector: details.Sector,
         industry: details.Industry
      };

      const companySummary = {
         previousClose: 'Previous Close',
         open: 'Open',
         daysRange: "Day's Range",
         fiftyTwoRange: '52 Week Range',
         volume: 'Volume',
         marketCap: 'Market Cap',
         peRation: 'PE Ratio (TTM)',
         eps: 'EPS (TTM)'
      };

      return (
         <Cards>
            <ul className='w-full h-full flex flex-col justify-between divide-y-1'>
               {Object.keys(companyDetails).map((item) => {
                   return (
                   <li 
                   key={item} 
                   className='flex-1 flex justify-between item-center'
                   >
                      <span>{item}: {companyDetails[item]}</span>
                   </li>
                   )
               })}
            </ul>
         </Cards>
      );
   };

   return <CompanyLists details={details} />;
};

export default Details;
