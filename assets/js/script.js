// Dependencies
//form input
var ba_formEl = $("#form");
//input element
var ba_stockInputEl = $("#search");
//
var tickerEl = $('.ticker')


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
      renderStck()
    });

}


// var ticker = document.querySelector('.ticker')
//   , list = document.querySelector('.ticker__list')
//   , clone = list.cloneNode(true)

// ticker.append(clone)


// USER INTERACTIONS

// user submit stock form
ba_formEl.on("submit", addFav)

//user clicks on news article



// DUNCAN 

var db_containerEl =  $(".container")

var db_priceEl = $(".stock-price")



//* DUNCAN

function renderPrice(){
  var db_containerEl = db_priceEl.val();
  var requestUrl = "https://financialmodelingprep.com/";
  var db_priceEl = "https://financialmodelingprep.com/api/v3/quote-short/AAPL?apikey=f4ffe18f8adcc3fc91a869983823de86";
  fetch(db_priceAPi)
  .then(function(response){
    return response.json();
    })
    .then(function(){
     localStorage.setItem(db_priceEl, db_containerEl)
    })
  console.log(response)
}




// NAFIS

//* NAFIS