// Dependencies
//form input
var ba_formEl = $("#form");
//input element
var ba_stockInputEl = $("#search");
// ticker element
//var tickerEl = $('.ticker');
// list element
//listEl = $('.ticker__list');

// DATA

var ba_finModPrepBaseURL = "https://financialmodelingprep.com";

// var ba_availableTags = [
//   "AAPL",
//   "MSFT",
//   "GOOG",
//   "GOOGL",
//   "AMZN",
//   "FB",
//   "TSLA",
//   "NVDA",
//   "PYPL",
//   "ASML",
//   "ADBE",
//   "CMCSA",
//   "CSCO",
//   "NFLX",
//   "PEP",
//   "INTC",
//   "AVGO",
//   "COST",
//   "TMUS",
//   "TXN",
// ];

var possibleSymbols = [];

getSymbols();
var ba_favArr = [];

ba_favArr = JSON.parse(localStorage.getItem("SavedStocks"));

console.log(ba_favArr);
// FUNCTIONS

$(function () {
  $("#search").autocomplete({
    source: possibleSymbols,
  });
});

function getSymbols() {
  var stockSymbolsURL = `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=70d6b158d23c070db6658a8cac0da9a9`;
  fetch(stockSymbolsURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        possibleSymbols.push(data[i].symbol);
      }
      console.log(possibleSymbols);
    });
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
      console.log(data);
      if (data.length > 0) {
        if (!ba_favArr) {
          ba_favArr = [];
        }
        ba_favArr.push(ba_stckSymb);
        ba_strFavArr = JSON.stringify(ba_favArr);
        localStorage.setItem("SavedStocks", ba_strFavArr);
      }
    });
}

// TODO: (Nafis) function to fetch and parse stock prices

// TODO: (Nafis) Write a function to render stock prices

// clone = listEl.cloneNode(true)

// tickerEl.append(clone)

// USER INTERACTIONS

// user submit stock form
ba_formEl.on("submit", addFav);

// DUNCAN

var db_containerEl = $(".container");

var db_priceEl = $(".stock-price");

var db_requestUrl = "https://financialmodelingprep.com";

//* DUNCAN

function renderPrice(event) {
  event.preventDefault();
  var db_containerEl = db_priceEl.val();

  var db_priceEl =
    "https://financialmodelingprep.com/api/v3/stock/list?apikey=f4ffe18f8adcc3fc91a869983823de86";
  fetch(db_priceAPi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      localStorage.setItem(db_priceEl, db_containerEl);
      renderPrice();
    })
    .then(function () {
      localStorage.setItem(db_priceEl, db_containerEl);
      renderPrice();
    });
  console.log(response);
}

//fetch("https://financialmodelingprep.com/api/v3/stock/list?apikey=f4ffe18f8adcc3fc91a869983823de86")

/*=============================
DISPLAY FINANCIAL NEWS - NAFIS
=============================*/

/*==============
DEPENDENCIES
==============*/

var na_newsCards = $(".news-container");
var na_newsSlides = $(".swiper-slide");
var na_numNewsCardSlots = $(".news-card").length;
var numArticleSlots = 3;

/*==============
DATA
==============*/

var na_favStocks = ["AAPL", "GOOG", "WDC", "TSLA", "AMZN"];
var na_numFavoriteStocks = na_favStocks.length;
var na_APIKey = "4e48677e67d7cfd40210605712bdb9a0";
var na_newsUrl = ""; 
var na_stocksNewsData = [];
var na_favStocksString = "";
var numberOfArticlesLimit = 2;

/*==============
FUNCTIONS
==============*/

function renderNewsCard(newsList, stockNum) {
  var numArticles = newsList.length;
  
  console.log(newsList)
  console.log(stockNum)

  for (var i=0; i<numArticles; i++) {
    var newSlide = $("#slide-" + stockNum + '-' + (i+1)); 
    var na_cardNewsTitle = $("<h2>").css({width:"95%"});
    var na_cardNewsText = $("<p>").css({width:"80%"});
    var stockNewsData = newsList[i];
    var na_newsImageUrl = stockNewsData.image;
    var na_stockNewsTitle = stockNewsData.title;
    var na_stockNewsText = stockNewsData.text;
      
    na_cardNewsTitle.text(na_stockNewsTitle);
    na_cardNewsText.text(na_stockNewsText);
    console.log(newSlide);
        
    newSlide.append(na_cardNewsTitle);
    newSlide.append(na_cardNewsText);

    console.log(newSlide)
    newSlide.first().css({
      "background-image": `linear-gradient(to bottom, rgba(93, 34, 6, 0.53), rgba(17, 42, 86, 0.82)), url(${na_newsImageUrl})`,
      "background-size": "cover"
    });
  ;}
};
  
function newsAPICall (numberOfArticlesLimit, stockTicker, stockNum) {
  na_newsUrl = `https://financialmodelingprep.com/api/v3/stock_news?tickers=${stockTicker}&limit=${numberOfArticlesLimit}&apikey=${na_APIKey}`;

  fetch(na_newsUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log("Fetch Response \n-------------");
    console.log(data);
    na_stocksNewsData = data; 
    console.log(na_stocksNewsData);
    renderNewsCard(na_stocksNewsData, stockNum);
  });

  return na_stocksNewsData.length;
};

function renderStockCards (favoriteStocks) {
  for (var i=0 ; i<favoriteStocks.length; i++) {
    console.log(favoriteStocks[i])
    newsAPICall(numberOfArticlesLimit, favoriteStocks[i], i+1);
    //removeEmptySlides (numArticles, numArticleSlots, i+1);
  };
};

function removeEmptyStockCards (numStockCards, numStockSlots) {
  for (var i=numStockCards+1; i<=numStockSlots; i++) {
    $('#stock-card-'+i).remove();
  };
};

// Code below displays correctly only if you inspect

// function removeEmptySlides (numArticles, numArticleSlots, stockNum) {
//   for (var i=numArticles+1; i<=numArticleSlots; i++) {
//     $('#slide-' + stockNum + '-' + i).remove();
//   };
// };


/*==============
INITIALIZATION
==============*/

// Carousel

var swiper = new Swiper(".mySwiper", {
  cssMode: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
  mousewheel: true,
  keyboard: true,
});

// Carousel

renderStockCards(na_favStocks);
console.log(na_numFavoriteStocks +' '+ na_numNewsCardSlots)
removeEmptyStockCards (na_numFavoriteStocks, na_numNewsCardSlots);