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


// NAFIS

//* NAFIS