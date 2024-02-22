// news.js

const newsContainer = document.getElementById('news-container');
const loadMoreBtn = document.getElementById('load-more-btn');
let page = 1; // Track pagination

async function fetchNews() {
  const apiKey = 'sd1TpsMfQCunk9iRKYOCLhn1w3nizpMnY5YLWUu7';
  const symbols = 'TSLA,AMZN,MSFT';
  const language = 'en';
  const url = `https://api.marketaux.com/v1/news/all?symbols=${symbols}&filter_entities=true&language=${language}&api_token=${apiKey}&page=${page}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch trading news');
    }
    const data = await response.json();

    // Display news articles
    data.data.forEach(article => {
      const newsArticle = document.createElement('div');
      newsArticle.classList.add('news-article');
      newsArticle.innerHTML = `
        <h2>${article.title}</h2>
        <p>${article.body}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      `;
      newsContainer.appendChild(newsArticle);
    });

    page++; // Increment page number for pagination
  } catch (error) {
    console.error('Error fetching trading news:', error);
  }
}

loadMoreBtn.addEventListener('click', fetchNews);

// Initial load
fetchNews();
