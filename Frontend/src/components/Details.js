import React from 'react';
import Cards from './Cards';

const Details = ({ details, summary }) => {
   const CompanyLists = ({ details, summary }) => {
   //    const companyDetails = {
   //       "Name": details.Name,
   //       "Country": details.Country,
   //       "Currency": details.Currency,
   //       "Exchange": details.Exchange,
   //       "Sector": details.Sector,
   //       "Industry": details.Industry
   //    };

      const globalQuote = summary && summary["Global Quote"] ? summary["Global Quote"] : {};
      
      const companySummary = {
         "Previous Close": globalQuote["08. previous close"] || 'N/A',
         "Open": globalQuote["02. open"] || 'N/A',
         "High": globalQuote["03. high"] || 'N/A',
         "Low": globalQuote["04. low"] || 'N/A',
         "Price": globalQuote["05. price"] || 'N/A',
         "Volume": globalQuote["06. volume"] || 'N/A'
      };

      return (
         <Cards>
            <ul className='w-full h-full flex flex-col justify-between divide-y-1'>
               {Object.keys(companySummary).map((item) => {

                  let value = companySummary[item];

                  if (!isNaN(parseFloat(value))) {
                     if (item === "Volume") {
                           value = parseInt(value, 10).toLocaleString();
                     } else {
                           value = parseFloat(value).toFixed(2);
                     }
                     value = value.toLocaleString(); 
                  }
                  return (
                     <li key={item} className="flex-1 flex justify-between items-center">
                        <span>{item}:</span>
                        <span>{isNaN(parseFloat(value)) ? companySummary[item] : value}</span>
                     </li>
                     );
               })}
            </ul>
         </Cards>
      );
   };

   return <CompanyLists details={details} summary={summary} />;

};

export default Details;
