const FetchDateRangeData = (range) => {
  switch (range) {
    case '1D':
    case '5D':
    case '1M':
      return {peroiod: 'intraday', range: range};  
    case '6M':
    case '1Y':
      return { period: 'daily', range: range };   
    default:
      return 'intraday';  
  }
}


export default FetchDateRangeData;


  
  