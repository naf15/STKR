/*=============================
DISPLAY FINANCIAL NEWS - NAFIS
=============================*/

var stockTicker = 'AAPL';
var APIKey = '4e48677e67d7cfd40210605712bdb9a0';

var newsUrl = `https://financialmodelingprep.com/api/v3/stock_news?tickers=${stockTicker}&limit=5&apikey=${APIKey}`;

fetch(newsUrl)
    .then(function (response) {
    return response.json();
})
    .then(function (data) {
    console.log('Fetch Response \n-------------');
    console.log(data);
});

function createNewsCard () {
}