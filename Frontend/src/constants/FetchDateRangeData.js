const FetchDateRangeData = (range) => {
  switch (range) {
    case '1D':
      return 'intraday';  
    case '5D':
    case '1M':
    case '6M':
      return { period: 'daily', range: range };   
    case '1Y':
      return 'monthly';  
    default:
      return 'intraday';  
  }
}


export default FetchDateRangeData;


  
  