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

    // Log the selected time series key
    console.log("Selected Time Series Key:", timeSeriesKey);

    const formattedData = Object.entries(data[timeSeriesKey]).map(([dateStr, dataPoint]) => {
        const timestamp = new Date(dateStr).getTime();
        const closePrice = parseFloat(dataPoint["4. close"]);
        return [timestamp, closePrice];
    });

    return formattedData;
};

export default formatStockData;

