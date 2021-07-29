// Dependencies
//form input
var ba_formEl = $("#form");
//input element
var ba_stockInputEl = $("#search");
// ticker element
var tickerEl = $('.ticker');
// list element
listEl = $('.ticker__list');


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

function renderStckCard() {
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
      renderStckCard()
    });

}

// TODO: (Nafis) function to fetch and parse stock prices

// TODO: (Nafis) Write a function to render stock prices




clone = listEl.cloneNode(true)

tickerEl.append(clone)


// USER INTERACTIONS

// user submit stock form
ba_formEl.on("submit", addFav)





// DUNCAN 

var db_containerEl =  $(".container");

var db_priceEl = $(".stock-price");

var db_requestUrl = "https://financialmodelingprep.com";


//* DUNCAN

function renderPrice(event){
  event.preventDefault()
  var db_containerEl = db_priceEl.val();
  
  var db_priceEl = "https://financialmodelingprep.com/api/v3/stock/list?apikey=f4ffe18f8adcc3fc91a869983823de86";
  fetch(db_priceAPi)
  .then(function(response){
    return response.json();
    })
    .then(function(){
     localStorage.setItem(db_priceEl, db_containerEl);
     renderPrice();
    })
  console.log(response)
}

//fetch("https://financialmodelingprep.com/api/v3/stock/list?apikey=f4ffe18f8adcc3fc91a869983823de86")



// NAFIS

//* NAFIS