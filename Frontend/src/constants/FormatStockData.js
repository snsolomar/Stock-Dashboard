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
      
      formattedData.push([
        new Date(date).getTime(), 
        parseFloat(timeSeries[date]["4. close"]) 
      ]);
    }
  
    return formattedData;
}

  
  export default FormatStockData;
  

