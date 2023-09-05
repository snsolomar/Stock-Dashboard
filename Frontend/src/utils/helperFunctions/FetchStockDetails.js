const FetchStockDetails = async (selectedStockSymbol, abortControllerSignal) => {
    const DevApi = process.env.REACT_APP_DEV_API_URL;
    try {
        const response = await fetch(`${DevApi}/stock/${selectedStockSymbol}`, { signal: abortControllerSignal });
        const data = await response.json();
        return data;
    } catch (error) {
        if (error.name !== 'AbortError') {
            console.error("Error fetching stock details:", error);
            throw error;
        }
    }
}

export default FetchStockDetails;
