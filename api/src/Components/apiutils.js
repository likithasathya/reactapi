const apiKey = '435ded952cef475aab43e8fe874f77ae';

// Function to make a GET request
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        throw new Error('Error fetching data: ' + error.message);
    }
};

export const getNews = async () => {
    //modify the url based upon you requirements, like country, language, type of news
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    return fetchData(apiUrl);
};
