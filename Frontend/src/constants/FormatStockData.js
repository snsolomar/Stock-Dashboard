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

    // New debug logs
    console.log("Data Object:", data);
    console.log("Data under Time Series Key:", data[timeSeriesKey]);

    const formattedData = Object.entries(data[timeSeriesKey]).map(([dateStr, dataPoint]) => {
        // Log the raw date string
        // console.log("Raw Date String:", dateStr);

        const timestamp = new Date(dateStr).getTime();
        // Log the created timestamp
        // console.log("Generated Timestamp:", timestamp);

        const closePrice = parseFloat(dataPoint["4. close"]);
        // Log the parsed close price
        // console.log("Parsed Close Price:", closePrice);

        return [timestamp, closePrice];
    });

    return formattedData;
};


export default formatStockData;

