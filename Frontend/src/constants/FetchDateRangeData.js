const FetchDateRangeData = (range) => {
    
    let dateRange;
    switch (range) {
      case '1D':
        dateRange = 'TIME_SERIES_INTRADAY';  
        break;
      case '5D':
        dateRange = 'TIME_SERIES_DAILY';  
        break;
      case '1M':
        dateRange = 'TIME_SERIES_DAILY';  
        break;
      case '6M':
        dateRange = 'TIME_SERIES_DAILY';  
        break;
      case '1Y':
        dateRange = 'TIME_SERIES_MONTHLY';  
        break;
      case '5Y':
        dateRange = 'TIME_SERIES_MONTHLY';  
        break;
      default:
        dateRange = 'TIME_SERIES_INTRADAY';  
    }
    
    return dateRange;
  }
  
  export default FetchDateRangeData;
  
  