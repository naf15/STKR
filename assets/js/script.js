// Dependencies
//form input
var ba_formEl = $("#form");
//input element
var ba_stockInputEl = $("#search");
// swiper element
var swiperContainer = $(".swiper-container");


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


var ba_favArr = [];

ba_favArr = JSON.parse(localStorage.getItem("SavedStocks"));


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

function getRedditPosts() {
  var redditAPIURL = "https://www.reddit.com/r/finance/new.json?sort=hot"
  fetch(redditAPIURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var swiperCards = swiperContainer.children().children();
      var numOfTicker = 20;
      for (var i = 0; i < numOfTicker; i++) {
        var headingTitle = swiperCards.children().eq(2*i);
        var pBody = swiperCards.children().eq(2*i + 1);
        var postTitle = data.data.children[i].data.title;
        var postBody = data.data.children[i].data.selftext;
        headingTitle.text(postTitle.slice(0,50) + "...");
        pBody.text( postBody.slice(0,100) + "...");
      }
    });
}

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// USER INTERACTIONS

getSymbols();

// user submit stock form
ba_formEl.on("submit", addFav);

// Initialization

getSymbols();
getRedditPosts();

// DUNCAN

var db_apiUrl = `https://financialmodelingprep.com/api/v3/quote-short/${d_stockTicker}?apikey=f4ffe18f8adcc3fc91a869983823de86`;
async function getPrice() {
  var response = await fetch(db_apiUrl);
  var data = await response.json();
  var { price, volume } = data;
  console.log(data);

  // user submit stock form
  ba_formEl.on("submit", addFav);

  // DUNCAN
}
getPrice();

function getStockData(stockTicker) {
  var db_apiUrl = `https://financialmodelingprep.com/api/v3/quote-short/${stockTicker}?apikey=f4ffe18f8adcc3fc91a869983823de86`;
  async function getPrice() {
    var response = await fetch(db_apiUrl);
    var data = await response.json();
    var { price, volume } = data;
    console.log(data);
    return data;
  }

  


  //fetch("https://financialmodelingprep.com/api/v3/stock/list?apikey=f4ffe18f8adcc3fc91a869983823de86")

  /*=============================
DISPLAY FINANCIAL NEWS - NAFIS
=============================*/

  /*==============
DEPENDENCIES
==============*/

  var na_newsCards = $(".news-container");

  /*==============
DATA
==============*/

  var na_favStocks = ["AAPL", "GOOG", "GME", "WDC"];
  // var na_stockTicker = 'AAPL';
  var na_APIKey = "4e48677e67d7cfd40210605712bdb9a0";
  var na_newsUrl = ""; // `https://financialmodelingprep.com/api/v3/stock_news?tickers=${na_stockTicker}&limit=5&apikey=${na_APIKey}`;
  var na_stocksNewsArray = [];
  var na_favStocksString = "";
  var na_article_limit = na_favStocks.length * 3;

  /*==============
FUNCTIONS
==============*/

  function stringifyFavStocks(list) {
    var stringifiedList = "";
    for (var i = 0; i < list.length - 1; i++) {
      // Appends each stock ticker to a comma-separated string for API call
      stringifiedList += list[i] + ",";
    }
    stringifiedList += list[length - 1];
    return stringifiedList;
  }

  function renderFaveStockCards() {
    for (var i = 0; i < na_favStocks.length; i++) {
      var na_stockTicker = na_favStocks[i];

      for (var j = 0; j < na_stocksNewsArray.length; j++) {
        var na_stockNews = na_stocksNewsArray[j];

        if (na_stockNews.symbol === na_stockTicker) {
          console.log(na_stockNews);
          renderNewsCard(na_stockNews);
        }
      }
    }
  }

  function renderNewsCard(stockData) {
    var na_card = $("<div>");
    var na_cardNewsTitle = $("<h2>");
    var na_cardNewsText = $("<p>");
    var na_newsImageUrl = stockData.image;
    var na_stockNewsTitle = stockData.title;
    var na_stockNewsText = stockData.text;

    na_card.attr("class", "news-card");

    na_card.css({
      "background-image": `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.53)), url(${na_newsImageUrl})`,
      width: "70%",
      height: "400px",
      "background-size": "cover",
      color: "white",
      padding: "20px",
      margin: "10px",
      "border-bottom-right-radius": "5px",
      "border-bottom-left-radius": "5px",
      "box-shadow": "5px 5px 15px rgba(0, 0, 0, 0.897)",
    });

    // "height": "200px", "background-image": `url(${na_newsImageUrl})`, "font-size": "200%"});

    na_cardNewsTitle.text(na_stockNewsTitle);
    na_cardNewsText.text(na_stockNewsText);
    console.dir(na_card);

    na_newsCards.append(na_card);
    na_card.append(na_cardNewsTitle);
    na_card.append(na_cardNewsText);
  }

  // Carousel

  // var slideIndex = 1;
  // showDivs(slideIndex);

  // function plusDivs(n) {
  //   showDivs(slideIndex += n);
  // }

  // function showDivs(n) {
  //   var i;
  //   var x = document.getElementsByClassName("mySlides");
  //   if (n > x.length) {slideIndex = 1}
  //   if (n < 1) {slideIndex = x.length} ;
  //   for (i = 0; i < x.length; i++) {
  //     x[i].style.display = "none";
  //   }
  //   x[slideIndex-1].style.display = "block";
  // }

  // Carousel

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
      console.log("Fetch Response \n-------------");
      console.log(data);
      na_stocksNewsArray = data; // do you index data?
      console.log(na_stocksNewsArray);
      //renderFaveStockCards();
    });

  na_newsCards.on("click", ".news-card", function () {
    console.log("open new tab");
  });
}
