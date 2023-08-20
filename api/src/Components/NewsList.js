import React, { useState, useEffect } from 'react';
import { getNews } from './apiutils.js'; // Import the utility function
import '../NewsList.css';
const NewsList = () => {
    const [news, setNews] = useState([]); // set to an array
    const [loading, setLoading] = useState(true); // set to boolean

    useEffect(() => {
        getNews()
            .then((data) => {
                setNews(data.articles); // Update the news state with the fetched data
                setLoading(false); // Mark loading as complete
            })
            .catch((error) => {
                console.error(error.message);
                setLoading(false); // Mark loading as complete even on error
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="news-list">
            <h1 className="news-title">Latest News</h1>
            {news.map((article) => (
                <div key={article.title} className="news-article">
                    <div className="article-thumbnail">
                        <img src={article.urlToImage} alt={article.title} />
                    </div>
                    <div className="article-content">
                        <h2 className="article-title">{article.title}</h2>
                        <p className="article-description">{article.description}</p>
                        <a className="read-more" href={article.url} target="_blank" rel="noopener noreferrer">
                            Read More
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewsList;