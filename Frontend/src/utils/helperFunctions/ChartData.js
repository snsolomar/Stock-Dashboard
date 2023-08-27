const ChartData = (data) => {
    return Object.entries(data["Time Series (Daily)"]).map(([date, value]) => {
        return [
            new Date(date).getTime(),  // Convert the date string to a timestamp
            parseFloat(value["4. close"])  // Use the closing value (or whichever value you prefer)
        ];
    }).reverse();  // This is to ensure the data is in ascending order by date
}
