import formatStockData from './formatStockData';

const FetchStockData = async (selectedDateRange, selectedStockSymbol, setChartData) => {
    const DevApi = process.env.REACT_APP_DEV_API_URL;
    const endpoint = `${DevApi}/stock/${selectedDateRange}/${selectedStockSymbol}`;

    // Create an instance of AbortController
    const abortController = new AbortController();

    try {
        const response = await fetch(endpoint, { signal: abortController.signal });
        const data = await response.json();

        const formattedData = formatStockData(data);
        
        setChartData(formattedData);
    } catch (error) {
        if (error.name !== 'AbortError') {
            console.error(`Error fetching ${selectedDateRange} stock data:`, error);
        }
    }
    
    // Don't forget to clean up
    return () => {
        abortController.abort();
    };
}

export default FetchStockData;



