// Used in Dashboard.js

import formatStockData from "../../constants/FormatStockData";

const FetchStockData = async (selectedStockSymbol, selectedDateRange, setChartData) => {
    const DevApi = process.env.REACT_APP_DEV_API_URL;
    
    let endpoint;
    switch (selectedDateRange) {
        case '1D':
            endpoint = `${DevApi}/stock/intraday/${selectedStockSymbol}`;
            break;
        case '1M':
            endpoint = `${DevApi}/stock/daily/${selectedStockSymbol}`;
            break;
        case '1Y':
            endpoint = `${DevApi}/stock/monthly/${selectedStockSymbol}`;
            break;
        default:
            console.error('Unknown date range:', selectedDateRange);
            return;
    }

    // Log the endpoint
    console.log("Endpoint:", endpoint);

    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        
        // Log the raw data
        console.log("Raw data:", data);
        
        const formattedData = formatStockData(data);
        
        // Log the formatted data
        console.log("Formatted data:", formattedData);
        
        // Return the formatted data
        return formattedData;

    } catch (error) {
        console.error(`Error fetching ${selectedDateRange} stock data for ${selectedStockSymbol}:`, error);
    }
};

export default FetchStockData;







