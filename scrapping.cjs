const Parser = require('rss-parser');
const axios = require('axios');
const cheerio = require('cheerio');

async function fetchArticlesFromRSS(rssUrl) {
  const parser = new Parser();
  const feed = await parser.parseURL(rssUrl);
  // Basic transformation of feed items
  const articles = feed.items.map(item => {
    return {
      sourceUrl: item.link,
      title: item.title,
      contentSnippet: item.contentSnippet || '',
      publishedDate: item.pubDate,
      content: null // We can optionally fetch full article if needed
    };
  });
  return articles;
}

async function fetchArticleByScraping(url) {
  
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  // Get all paragraph text from a main content area
  const paragraphs = $('p').map((_, el) => $(el).text()).get();
  console.log(paragraphs)
  return paragraphs.join('\n\n');
}

fetchArticleByScraping('https://tanaschita.com/swift-hash-functions/')