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

var na_stockTicker = 'AAPL';
var na_APIKey = '4e48677e67d7cfd40210605712bdb9a0';
var na_newsUrl = `https://financialmodelingprep.com/api/v3/stock_news?tickers=${na_stockTicker}&limit=5&apikey=${na_APIKey}`;
var na_stock_news_array = [];

/*==============
FUNCTIONS
==============*/

function createNewsCard (i) {
  var na_card = $('<div>');
  var na_cardNewsTitle = $('<h2>');
  var na_cardNewsText = $('<p>');
  var na_newsImageUrl = na_stock_news_array[i].image;
  var na_stockNewsTitle = na_stock_news_array[i].title;
  var na_stockNewsText = na_stock_news_array[i].text;
  
  na_card.attr('class','news-card')
  
  na_card.css({"height": "200px", "background-image": `url(${na_newsImageUrl})`, "font-size": "200%"});
  na_cardNewsTitle.text(na_stockNewsTitle);
  na_cardNewsText.text(na_stockNewsText);
  console.dir(na_card)

  na_newsCards.append(na_card);
  na_card.append(na_cardNewsTitle);
  na_card.append(na_cardNewsText);
}

/*==============
INITIALIZATION
==============*/

fetch(na_newsUrl)
  .then(function (response) {
  return response.json();
})
  .then(function (data) {
  console.log('Fetch Response \n-------------');
  console.log(data);
  na_stock_news_array.push(data[0])
  createNewsCard(0)
});

na_newsCards.on('click','.news-card', function () {
  console.log('open new tab');
})
