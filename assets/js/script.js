// Dependencies
//form input
var ba_formEl = $("#form");
//input element
var ba_stockInputEl = $("#search");


// DATA

var ba_finModPrepBaseURL = "https://financialmodelingprep.com";

// FUNCTIONS

$(function () {
  var ba_availableTags = [
    "AAPL",
    "MSFT",
    "GOOG",
    "GOOGL",
    "AMZN",
    "FB",
    "TSLA",
    "NVDA",
    "PYPL",
    "ASML",
    "ADBE",
    "CMCSA",
    "CSCO",
    "NFLX",
    "PEP",
    "INTC",
    "AVGO",
    "COST",
    "TMUS",
    "TXN",
  ];
  $("#search").autocomplete({
    source: ba_availableTags,
  });
});

function renderStck() {
    renderPrice();
    renderNews();
}

function addFav(event) {
  event.preventDefault();
  var ba_stckSymb = ba_stockInputEl.val();
  var ba_endPoint = `/api/v3/profile/${ba_stckSymb}?apikey=70d6b158d23c070db6658a8cac0da9a9`;
  ba_finModPrepURL = ba_finModPrepBaseURL + ba_endPoint;
  var ba_stckName = "";
  fetch(ba_finModPrepURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      ba_stckName = data[0].companyName;
      localStorage.setItem(ba_stckSymb, ba_stckName);
    });

}


// USER INTERACTIONS

// user submit stock form
ba_formEl.on("submit", addFav)

//user clicks on news article



// DUNCAN 

//* DUNCAN


/*=============================
DISPLAY FINANCIAL NEWS - NAFIS
=============================*/

/*==============
DEPENDENCIES
==============*/

var na_newsCards = $('.news-container');

/*==============
DATA
==============*/

var na_favStocks = ['AAPL','GOOG','GME','WDC'];
// var na_stockTicker = 'AAPL'; 
var na_APIKey = '4e48677e67d7cfd40210605712bdb9a0';
var na_newsUrl = '' // `https://financialmodelingprep.com/api/v3/stock_news?tickers=${na_stockTicker}&limit=5&apikey=${na_APIKey}`;
var na_stocksNewsArray = [];
var na_favStocksString = '';
var na_article_limit = na_favStocks.length*3;
/*==============
FUNCTIONS
==============*/

function stringifyFavStocks (list) {
  var stringifiedList = '';
  for (var i=0; i<list.length-1; i++) {
    // Appends each stock ticker to a comma-separated string for API call
    stringifiedList += list[i] + ',';
  }
  stringifiedList += list[length-1];
  return stringifiedList;
};

function renderFaveStockCards () {
  
 // fetch 

  for (var i=0; i<na_favStocks.length; i++) {
    var na_stockTicker = na_favStocks[i];
    
    for (var j=0; j<na_stocksNewsArray.length; j++) {
      var na_stockNews = na_stocksNewsArray[j];
      
      if (na_stockNews.symbol === na_stockTicker) {
        console.log(na_stockNews);
        renderNewsCard(na_stockNews);
      };
    };
  };
};

function renderNewsCard (stockData) {
  var na_card = $('<div>');
  var na_cardNewsTitle = $('<h2>');
  var na_cardNewsText = $('<p>');
  var na_newsImageUrl = stockData.image;
  var na_stockNewsTitle = stockData.title;
  var na_stockNewsText = stockData.text;
  
  na_card.attr('class','news-card')
  
  na_card.css({"height": "200px", "background-image": `url(${na_newsImageUrl})`, "font-size": "200%"});
  na_cardNewsTitle.text(na_stockNewsTitle);
  na_cardNewsText.text(na_stockNewsText);
  console.dir(na_card);

  na_newsCards.append(na_card);
  na_card.append(na_cardNewsTitle);
  na_card.append(na_cardNewsText);
}

/*==============
INITIALIZATION
==============*/

na_favStocksString = stringifyFavStocks(na_favStocks);
na_newsUrl = `https://financialmodelingprep.com/api/v3/stock_news?tickers=${na_favStocksString}&limit=${na_article_limit}&apikey=${na_APIKey}`;

fetch(na_newsUrl)
  .then(function (response) {
  return response.json();
})
  .then(function (data) {
  console.log('Fetch Response \n-------------');
  console.log(data);
  na_stocksNewsArray = data; // do you index data?
  console.log(na_stocksNewsArray);
  renderFaveStockCards();
});

na_newsCards.on('click','.news-card', function () {
  console.log('open new tab');
})
