const formatStockData = (data) => {
    let timeSeriesKey;
    if (data["Time Series (5min)"]) {
        timeSeriesKey = "Time Series (5min)";
    } else if (data["Time Series (Daily)"]) {
        timeSeriesKey = "Time Series (Daily)";
    } else if (data["Monthly Time Series"]) {
        timeSeriesKey = "Monthly Time Series";
    } else {
        console.error("Unknown data format");
        return [];
    }

    const formattedData = Object.entries(data[timeSeriesKey]).map(([dateStr, dataPoint]) => {
        const timestamp = new Date(dateStr).getTime();
        const openPrice = parseFloat(dataPoint["1. open"]);
        const highPrice = parseFloat(dataPoint["2. high"]);
        const lowPrice = parseFloat(dataPoint["3. low"]);
        const closePrice = parseFloat(dataPoint["4. close"]);
        return [timestamp, openPrice, highPrice, lowPrice, closePrice];
    });

    return formattedData;
};

export default formatStockData;

