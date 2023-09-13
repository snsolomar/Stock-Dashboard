// Used in Dashboard.js

import formatStockData from "../../constants/FormatStockData";

const FetchStockData = async (selectedDateRange, selectedStockSymbol, setChartData) => {
    const DevApi = process.env.REACT_APP_DEV_API_URL;
    const endpoint = `${DevApi}/stock/daily/${selectedStockSymbol}/${selectedDateRange}`;

    // Log the endpoint
    console.log("Endpoint:", endpoint);

    // Create an instance of AbortController
    const abortController = new AbortController();

    try {
        const response = await fetch(endpoint, { signal: abortController.signal });
        const data = await response.json();

        // Log the raw data
        console.log("Raw data:", data);

        const formattedData = formatStockData(data);
        
        // Log the formatted data
        console.log("Formatted data:", formattedData);

        setChartData(formattedData);
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log("Request was aborted");
        } else {
            console.error(`Error fetching ${selectedDateRange} stock data:`, error);
        }
    }
    
    return () => {
        abortController.abort();
    };
}

export default FetchStockData;




