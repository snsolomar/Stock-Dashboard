// Used in Search.js

const FetchSearchResults = async (inputValue) => {
    const DevApi = process.env.REACT_APP_DEV_API_URL;

    try {
        const response = await fetch(`${DevApi}/searchResults/${inputValue}`)
        const data = await response.json();

        return data.bestMatches || [];
    } catch (error) {
        console.error("Error fetching search results:", error);
        throw error;
    }
}

export default FetchSearchResults;