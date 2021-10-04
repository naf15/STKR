/*================
DEPENDENCIES
================*/

//form input
var formEl = $("#form");
//input element
var stockInputEl = $("#search");
// swiper element
var swiperContainer = $(".swiper-container");

var tickerContainer = $(".ticker");

var newsSlides = $(".swiper-slide");
var numStockCardSlots = $(".news-card").length;
var numArticleSlots = 1;

/*================
DATA
================*/

var possibleSymbols = [];
var savedStock = [];
var infoObj = {
  price: 0,
  name: "",
  change: 0,
  stocksymbol: "",
};

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

var APIKey = "876f087bfdde120e2a5b84d29289c45b";
var newsURL = "";
var stocksNewsData = [];
var numberOfArticlesLimit = 3; //default to 3

/*================
FUNCTIONS
================*/

$(function () {
  $("#search").autocomplete({
    source: possibleSymbols,
  });
});

function getSymbols() {
  var stockSymbolsURL = `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${APIKey}`;
  fetch(stockSymbolsURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.length; i++) {
        possibleSymbols.push(data[i].symbol);
      }
    });
}

function getFav() {
  if (!localStorage.getItem("SavedStocks")) {
    savedStocks = [];
  } else {
    savedStocks = JSON.parse(localStorage.getItem("SavedStocks"));
  }
}

function addFav(event) {
  event.preventDefault();
  var stckSymb = stockInputEl.val();
  finModPrepURL = `https://financialmodelingprep.com/api/v3/profile/${stckSymb}?apikey=${APIKey}`;
  var stckName = "";
  fetch(finModPrepURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.length > 0) {
        if (!savedStocks) {
          savedStocks = [];
        }
        if (!savedStocks.includes(stckSymb)) {
          if (savedStocks.length < 5) {
            savedStocks.push(stckSymb);
            strFavArr = JSON.stringify(savedStocks);
            localStorage.setItem("SavedStocks", strFavArr);
          } else {
            savedStocks.push(stckSymb);
            savedStocks.shift();
            strFavArr = JSON.stringify(savedStocks);
            localStorage.setItem("SavedStocks", strFavArr);
          }
        }
      }
      getFav();
      clearStockCards();
      resetStockCards(5);
      renderStockCards(savedStocks);
      removeEmptyStockCards(savedStocks.length, numStockCardSlots);
    });
}

function getRedditPosts() {
  var redditAPIURL = "https://www.reddit.com/r/finance/new.json?sort=hot";
  fetch(redditAPIURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var numOfTicker = 20;
      for (var i = 0; i < numOfTicker; i++) {
        var postUrl = data.data.children[i].data.url;
        var postTitle = data.data.children[i].data.title;
        var postBody = data.data.children[i].data.selftext;
        /*========Nafis Ticker Experiment======== */
        var tickerLink = $("<a>")
          .attr("href", postUrl)
          .attr("target", "_blank")
          .text(postTitle.slice(0, 50))
          .css({ "text-decoration": "none" });
        var tickerPost = $("<div>")
          .attr("class", "ticker__item")
          .append(tickerLink);
        tickerContainer.append(tickerPost);

        /*========Nafis Ticker Experiment======== */
      }
    });
}

function getStockDataContent(stockSymbol, stockNum) {
  var profileURL = `https://financialmodelingprep.com/api/v3/profile/${stockSymbol}?apikey=${APIKey}`;
  fetch(profileURL)
    .then(function (response) {
      console.log("URL works");
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      stockPrice = data[0].price;
      stockName = data[0].companyName;
      stockChanges = data[0].changes;
      stockSymb = data[0].symbol;
      infoObj.price = stockPrice;
      infoObj.name = stockName;
      infoObj.change = stockChanges;
      infoObj.stockSymbol = stockSymb;
      renderInfoCard(infoObj, stockNum);
    });
}

function renderInfoCard(stockInfo, stockNum) {
  var price = stockInfo.price;
  var priceChange = stockInfo.change;
  var symbol = stockInfo.stockSymbol;
  var companyName = "(" + stockInfo.name + ")";
  var stockInfoContainer = $("#stock-info-card-" + stockNum);

  var leftDiv = $("<div>").css({
    width: "50%",
    display: "flex",
    "justify-content": "flex-start",
    "align-items": "center",
  });
  var rightDiv = $("<div>").css({
    width: "13%",
    display: "flex",
    "flex-direction": "column",
    "justify-content": "space-between",
    "align-items": "center",
  });

  var symbolElement = $("<h2>").text(symbol);
  var companyNameElement = $("<h3>")
    .css({ "font-weight": "100" })
    .text(companyName);
  var priceElement = $("<p>").text(price).css({
    color: "rgb(255, 255, 255)",
    width: "100%",
    display: "flex",
    height: "50%",
    "justify-content": "center",
    "align-items": "center",
    "font-size": "large",
  });
  var priceChangeElement = $("<p>").text(priceChange).css({
    color: "rgb(255, 255, 255)",
    "background-color": "rgb(255, 0, 0)",
    width: "100%",
    display: "flex",
    height: "50%",
    "justify-content": "center",
    "align-items": "center",
    "border-radius": "3px",
    "font-size": "large",
  });

  if (priceChange >= 0) {
    priceChangeElement.css({ "background-color": "green" });
  } else {
    priceChangeElement.css({ "background-color": "red" });
  }

  leftDiv.append(symbolElement).append(companyNameElement);
  rightDiv.append(priceElement).append(priceChangeElement);

  stockInfoContainer.append(leftDiv).append(rightDiv);
}

function renderNewsCard(newsList, stockNum) {
  var numArticles = newsList.length;
  for (var i = 0; i < numArticles; i++) {
    var newSlide = $("#slide-" + stockNum + "-" + (i + 1));
    var cardNewsTitle = $("<h2>").css({
      width: "95%",
      "font-weight": "bolder",
    });
    var cardNewsText = $("<p>").css({
      width: "80%",
      "font-weight": "lighter",
    });
    var stockNewsData = newsList[i];
    var newsImageUrl = stockNewsData.image;
    var stockNewsTitle = stockNewsData.title;
    var stockNewsText = stockNewsData.text.slice(0, 250) + "...";

    cardNewsTitle.text(stockNewsTitle);
    cardNewsText.text(stockNewsText);

    newSlide.append(cardNewsTitle);
    newSlide.append(cardNewsText);

    newSlide.first().css({
      "background-image": `linear-gradient(to bottom, rgba(93, 34, 6, 0.53), rgba(17, 42, 86, 0.82)), url(${newsImageUrl})`,
      "background-size": "cover",
    });
  }
}

function getStockNewsContent(numberOfArticlesLimit, stockTicker, stockNum) {
  newsURL = `https://financialmodelingprep.com/api/v3/stock_news?tickers=${stockTicker}&limit=${numberOfArticlesLimit}&apikey=${APIKey}`;

  fetch(newsURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Fetch Response \n-------------");
      console.log(data);
      stocksNewsData = data;
      console.log(stocksNewsData);
      renderNewsCard(stocksNewsData, stockNum);
    });

  return stocksNewsData.length;
}

function renderStockCards(favoriteStocks) {
  for (var i = 0; i < favoriteStocks.length; i++) {
    var stockNum = i + 1;
    var currentStock = favoriteStocks[i];
    getStockNewsContent(numberOfArticlesLimit, currentStock, stockNum);
    getStockDataContent(currentStock, stockNum);
  }
}

function resetStockCards(numStockSlots) {
  for (var i = 1; i <= numStockSlots; i++) {
    $("#stock-card-" + i).show();
  }
}

function removeEmptyStockCards(numStockCards, numStockSlots) {
  for (var i = numStockCards + 1; i <= numStockSlots; i++) {
    $("#stock-card-" + i).hide();
  }
}

function clearStockCards() {
  for (var i = 1; i <= savedStocks.length; i++) {
    var currentStockInfoCard = $(`#stock-info-card-${i}`);

    currentStockInfoCard.children().each(function () {
      this.remove();
    });
    // removes stock-info-cards

    for (var j = 1; j <= numberOfArticlesLimit; j++) {
      var currentStockNewsArticle = $(`#slide-${i}-${j}`);
      currentStockNewsArticle.children().each(function () {
        this.remove();
      });

      // removes stock-news-card
    }
  }
}

/*================
USER INTERACTIONS
================*/

// user submit stock form
formEl.on("submit", function (event) {
  addFav(event); //API
});

/*==============
INITIALIZATION
==============*/

getFav();
getSymbols();
getRedditPosts();
clearStockCards();
resetStockCards(numStockCardSlots);
renderStockCards(savedStocks);
removeEmptyStockCards(savedStocks.length, numStockCardSlots);
