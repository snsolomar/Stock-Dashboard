// Function to construct the appropriate endpoint based on range and stock symbol
const constructEndpoint = (selectedDateRange, selectedStockSymbol) => {
    const DevApi = process.env.REACT_APP_DEV_API_URL;
    let endpoint;

    // Switch case to determine the appropriate endpoint
    switch (selectedDateRange) {
        case 'intraday':
            endpoint = `${DevApi}/stock/intraday/${selectedStockSymbol}`;
            break;
        case 'daily':
            endpoint = `${DevApi}/stock/daily/${selectedStockSymbol}`;
            break;
        case 'monthly':
            endpoint = `${DevApi}/stock/monthly/${selectedStockSymbol}`;
            break;
        case '5D':
        case '1M':
        case '6M':
            endpoint = `${DevApi}/stock/daily/${selectedStockSymbol}/${selectedDateRange}`;
            break;
        default:
            throw new Error("Invalid range provided.");
    }
    return endpoint;
};