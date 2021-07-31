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

/*==============
DATA
==============*/

var na_favStocks = ["AAPL"];
// var na_stockTicker = 'AAPL';
var na_numFavoriteStocks = na_favStocks.length;
var na_APIKey = "4e48677e67d7cfd40210605712bdb9a0";
var na_newsUrl = ""; // `https://financialmodelingprep.com/api/v3/stock_news?tickers=${na_stockTicker}&limit=5&apikey=${na_APIKey}`;
var na_stockNewsObject = {};
var na_stocksNewsData = [];
var na_favStocksString = "";
var numberOfArticlesLimit = 2;

/*==============
FUNCTIONS
==============*/

function stringifyFavStocks(list) {
  var stringifiedList = "";
  for (var i = 0; i < list.length - 1; i++) {
    // Appends each stock ticker to a comma-separated string for API call
    stringifiedList += list[i] + ",";
  }
  stringifiedList += list[list.length - 1];
  console.log(stringifiedList)
  return stringifiedList;
}

function renderFaveStockCards() {
  // for (var i = 0; i < na_favStocks.length; i++) {
  //   var na_stockTicker = na_favStocks[i];

    
  for (var i = 0; i < na_stocksNewsData.length; i++) {
    var na_stockNews = na_stocksNewsData[i];

    if (!na_stockNewsObject[na_stockNews.symbol]) {
      na_stockNewsObject[na_stockNews.symbol] = [];
    };

    na_stockNewsObject[na_stockNews.symbol].push({title : na_stockNews.title, text : na_stockNews.text, image : na_stockNews.image});

      


      // if (na_stockNews.symbol === na_stockTicker) {
      //   console.log(na_stockNews);
      //   renderNewsCard(na_stockNews);
      // }
  }
  console.log(na_stockNewsObject);
  
  //na_stockNewsObject[stock] = [{}];

  // }


  for (var i = 0; i < na_favStocks.length; i++) {
    var na_stockTicker = na_favStocks[i];
    console.log(na_stockTicker);
    console.log(na_stockNewsObject[na_stockTicker]);
    renderNewsCard(na_stockNewsObject[na_stockTicker]);
  }

}


function renderNewsCard(newsList) {
  var na_newsCard = $("<div>").attr("class", "news-card");
  var swiperContainer = $("<div>").attr("class", "swiper-container mySwiper");
  var swiperWrapper = $("<div>").attr("class", "swiper-wrapper");
  var swiperButtonNext = $("<div>").attr("class", "swiper-button-next");
  var swiperButtonPrev = $("<div>").attr("class", "swiper-button-prev");
  var swiperPagination = $("<div>").attr("class", "swiper-pagination");
  var numArticles = newsList.length;
  
  for (var i=0; i<numArticles; i++) {
    var newSlide = $("<div>").attr("class", "swiper-slide"); 
    var na_cardNewsTitle = $("<h2>");
    var na_cardNewsText = $("<p>");
    var stockNewsData = newsList[i];
    var na_newsImageUrl = stockNewsData.image;
    var na_stockNewsTitle = stockNewsData.title;
    var na_stockNewsText = stockNewsData.text;

    newSlide.css({
      "background-image": `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.53)), url(${na_newsImageUrl})`,
      width: "600px",
      height: "400px",
      "background-size": "cover",
      color: "white",
      padding: "20px",
      margin: "10px",
      "border-bottom-right-radius": "5px",
      "border-bottom-left-radius": "5px",
      "box-shadow": "5px 5px 15px rgba(0, 0, 0, 0.897)",
    });
      
    na_cardNewsTitle.text(na_stockNewsTitle);
    na_cardNewsText.text(na_stockNewsText);
    console.dir(na_newsCard);
        
    newSlide.append(na_cardNewsTitle);
    newSlide.append(na_cardNewsText);
    swiperWrapper.append(newSlide);

    console.log(na_newsSlides[0])
    na_newsSlides.first().css({
      "background-image": `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.53)), url(${na_newsImageUrl})`,
      "background-size": "cover"
    });
  }
  
  // color: "white",
  // padding: "20px",
  // margin: "10px",
  // "border-bottom-right-radius": "5px",
  // "border-bottom-left-radius": "5px",
  // "box-shadow": "5px 5px 15px rgba(0, 0, 0, 0.897)",
  // swiperContainer.append(swiperWrapper);
  // swiperContainer.append(swiperButtonNext);
  // swiperContainer.append(swiperButtonPrev);
  // swiperContainer.append(swiperPagination);
  // na_newsCard.append(swiperContainer);
  // na_newsCards.append(na_newsCard);
}



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

function newsAPICall (numberOfArticlesLimit, stockTicker) {
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
    renderNewsCard(na_stocksNewsData);
  });
}

function renderStockCards (favoriteStocks) {
  for (var i=0 ; i<favoriteStocks.length; i++) {
    newsAPICall(numberOfArticlesLimit, favoriteStocks[i]);
  };
};

function removeEmptyStockCards (numStockCards, numStockSlots) {
  for (var i=numStockCards+1; i<=numStockSlots; i++) {
    $('#stock-card-'+i).remove();
  };
};

function removeEmptySlides (numArticles, numArticleSlots) {
  for (var i=numArticle+1; i<=numArticleSlots; i++) {
    $('#stock-card-'+i).remove();
  };
};


/*==============
INITIALIZATION
==============*/

renderStockCards(na_favStocks);
removeEmptyStockCards (na_numFavoriteStocks, na_numNewsCardSlots);

// na_article_limit = 2;

// na_favStocksString = stringifyFavStocks(na_favStocks);

// console.log(na_article_limit);

// fetch(na_newsUrl)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log("Fetch Response \n-------------");
//     console.log(data);
//     na_stocksNewsData = data; 
//     console.log(na_stocksNewsData);
//     renderFaveStockCards();
//   });

// na_newsCards.on("click", ".news-card", function () {
//   console.log("open new tab");
// });
