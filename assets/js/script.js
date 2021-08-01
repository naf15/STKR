// Dependencies
//form input
var ba_formEl = $("#form");
//input element
var ba_stockInputEl = $("#search");
// swiper element
var swiperContainer = $(".swiper-container");

/*========Nafis Ticker Experiment======== */
var tickerContainer = $('.ticker');
/*========Nafis Ticker Experiment======== */


// DATA

var ba_finModPrepBaseURL = "https://financialmodelingprep.com";
var possibleSymbols = [];
var ba_favArr = [];
var infoArr = [];

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
        };
        if (ba_favArr.length < 5) {
          ba_favArr.push(ba_stckSymb);
          ba_strFavArr = JSON.stringify(ba_favArr);
          localStorage.setItem("SavedStocks", ba_strFavArr);
        } else {
          ba_favArr.push(ba_stckSymb);
          ba_favArr.shift();
          ba_strFavArr = JSON.stringify(ba_favArr);
          localStorage.setItem("SavedStocks", ba_strFavArr);
        };
      };
    });
};

function getRedditPosts() {
  var redditAPIURL = "https://www.reddit.com/r/finance/new.json?sort=hot"
  fetch(redditAPIURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // var swiperCards = swiperContainer.children().children();
      var numOfTicker = 20;
      for (var i = 0; i < numOfTicker; i++) {
        // var headingTitle = swiperCards.children().eq(2*i);
        // var pBody = swiperCards.children().eq(2*i + 1);
        var postUrl = data.data.children[i].data.url;
        var postTitle = data.data.children[i].data.title;
        var postBody = data.data.children[i].data.selftext;
        // headingTitle.text(postTitle.slice(0,50) + "...");
        // pBody.text( postBody.slice(0,100) + "...");

        /*========Nafis Ticker Experiment======== */
        var tickerLink = $('<a>').attr('href',postUrl).attr('target','_blank').text(postTitle.slice(0,50)).css({'text-decoration':'none'});
        var tickerPost = $('<div>').attr('class', 'ticker__item').append(tickerLink);
        // var tickerPost = $('<div>').attr('class', 'ticker__item').text(postTitle.slice(0,50));
        tickerContainer.append(tickerPost);

        /*========Nafis Ticker Experiment======== */
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


// user submit stock form
ba_formEl.on("submit", addFav);

// Initialization

// getSymbols();
getRedditPosts();

/*=============================
DISPLAY STOCK PRICES - DUNCAN
=============================*/

/*-----NECESSARY-------*/
// **current price**
// **stock ticker**
// **stock full name**

/*-----OPTIONAL-------*/
// change 
// change direct (+/-)


// ==========================================================================================================================================================================

// function takes in Stock Symbol as arguement and changes the content of infoArr which is a global variable. The order of the data in the array is [price, name, changes(up or down)].
function renderstockdata(x) {
  var profileURL = `https://financialmodelingprep.com/api/v3/profile/${x}?apikey=a0e84d4ecb7ba93551e1c9332dd5d530`
  fetch(profileURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      stockPrice = data[0].price;
      stockName = data[0].companyName;
      stockChanges = data[0].changes;
      infoArr.splice(0, infoArr.length)
      infoArr.push(stockPrice);
      infoArr.push(stockName);
      infoArr.push(stockChanges);
    });

}

// ==========================================================================================================================================================================

renderstockdata("AAPL");
console.log(infoArr);

// var db_apiUrl = `https://financialmodelingprep.com/api/v3/quote-short/${d_stockTicker}?apikey=f4ffe18f8adcc3fc91a869983823de86`;
// async function getPrice() {
//   var response = await fetch(db_apiUrl);
//   var data = await response.json();
//   var { price, volume } = data;
//   console.log(data);

//   // user submit stock form
//   ba_formEl.on("submit", addFav);
// }

// // getPrice();

// function getStockData(stockTicker) {
//   var db_apiUrl = `https://financialmodelingprep.com/api/v3/quote-short/${stockTicker}?apikey=f4ffe18f8adcc3fc91a869983823de86`;
//   async function getPrice() {
//     var response = await fetch(db_apiUrl);
//     var data = await response.json();
//     var { price, volume } = data;
//     console.log(data);
//     return data;
//   }
// }

  


//fetch("https://financialmodelingprep.com/api/v3/stock/list?apikey=f4ffe18f8adcc3fc91a869983823de86")

/*=============================
DISPLAY STOCK PRICES - DUNCAN
=============================*/



/*=============================
DISPLAY FINANCIAL NEWS - NAFIS
=============================*/

/*==============
DEPENDENCIES
==============*/

var stocksContainer = $(".stocks-container"); //not needed?
var na_newsSlides = $(".swiper-slide");
var na_numNewsCardSlots = $(".news-card").length;
var numArticleSlots = 1;

/*==============
DATA
==============*/

var na_favStocks = ["AAPL", "GOOG", "WDC"];
var na_numFavoriteStocks = na_favStocks.length;
var na_APIKey = "4e48677e67d7cfd40210605712bdb9a0";
var na_newsUrl = ""; 
var na_stocksNewsData = [];
var na_favStocksString = "";
var numberOfArticlesLimit = 3; //defauly to 3

/*==============
FUNCTIONS
==============*/


function renderInfoCard (stockInfo, stockNum) {
  var price = stockInfo.price;
  var priceChange = stockInfo.change;
  var symbol = stockInfo.symbol;
  var companyName = '('+ stockInfo.companyName + ')';
  var stockInfoContainer = $('#stock-info-card-'+ stockNum);
  
  var leftDiv = $('<div>').css({
    width: '50%',
    display: 'flex',
    'justify-content': 'flex-start',
    'align-items': 'center'
  });
  var rightDiv = $('<div>').css({
    'width': '13%',
    'display': 'flex',
    'flex-direction': 'column',
    'justify-content': 'space-between',
    'align-items': 'center'
  });

  var symbolElement = $('<h2>').text(symbol);  
  var companyNameElement = $('<h3>').css({'font-weight':'100'}).text(companyName);
  var priceElement = $('<p>').text(price).css({
    'color': 'rgb(255, 255, 255)',
    'width': '100%',
    'display': 'flex',
    'height': '50%',
    'justify-content': 'center',
    'align-items': 'center',
    'font-size': 'large'
  });
  var priceChangeElement = $('<p>').text(priceChange).css({
    'color': 'rgb(255, 255, 255)',
    'background-color': 'rgb(255, 0, 0)',
    'width': '100%',
    'display': 'flex',
    'height': '50%',
    'justify-content': 'center',
    'align-items': 'center',
    'border-radius': '3px',
    'font-size': 'large'
  });

  if (priceChange >= 0) {
    priceChangeElement.css({'background-color':'green'});
  } else {
    priceChangeElement.css({'background-color':'red'}) 
  }
  
  leftDiv.append(symbolElement).append(companyNameElement);
  rightDiv.append(priceElement).append(priceChangeElement);
  
  stockInfoContainer.append(leftDiv).append(rightDiv);
}

function renderNewsCard(newsList, stockNum) {
  var numArticles = newsList.length;
  
  console.log(newsList)
  console.log(stockNum)

  for (var i=0; i<numArticles; i++) {
    var newSlide = $("#slide-" + stockNum + '-' + (i+1)); 
    var na_cardNewsTitle = $("<h2>").css({width:"95%", 'font-weight':'bolder'});
    var na_cardNewsText = $("<p>").css({width:"80%", 'font-weight':'lighter'});
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
  };
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
    var currentStock = favoriteStocks[i] 
    var stockNum = i+1
    console.log(currentStock)
    newsAPICall(numberOfArticlesLimit, currentStock, stockNum );
    //removeEmptySlides (numArticles, numArticleSlots, i+1);
    
    //priceAPICall() // includes below at the bottom 
    //renderInfoCard(currentStock)
    renderInfoCard({price: 250, change: -50, up: true, companyName: "Apple Inc.", symbol: "AAPL" }, stockNum)
  };
};

function removeEmptyStockCards (numStockCards, numStockSlots) {
  for (var i=numStockCards+1; i<=numStockSlots; i++) {
    $('#stock-card-'+i).remove();
  };
};

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
