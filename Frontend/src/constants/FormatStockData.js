function FormatStockData(data) {
    let formattedData = [];
  
    let timeSeries;
    if (data["Time Series (5min)"]) {
      timeSeries = data["Time Series (5min)"];
    } else if (data["Time Series (Daily)"]) {
      timeSeries = data["Time Series (Daily)"];
    } else if (data["Monthly Time Series"]) {
      timeSeries = data["Monthly Time Series"];
    } else {
      return [];
    }
  
    for (let date in timeSeries) {
      formattedData.push({
        date: new Date(date),
        open: parseFloat(timeSeries[date]["1. open"]),
        high: parseFloat(timeSeries[date]["2. high"]),
        low: parseFloat(timeSeries[date]["3. low"]),
        close: parseFloat(timeSeries[date]["4. close"]),
        volume: parseInt(timeSeries[date]["5. volume"])
      });
    }
  
    return formattedData;
  }
  
  export default FormatStockData;
  

