// Dependencies
//form input
var formEl = $("#form");
//input element
var stockInputEl = $("#search");


// DATA

var finModPrepBaseURL = "https://financialmodelingprep.com";

// FUNCTIONS

$(function () {
  var availableTags = [
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
    source: availableTags,
  });
});

function addFav(event) {
    event.preventDefault();

    var stckSymb = stockInputEl.val();
    var endPoint = `/api/v3/profile/${stckSymb}?apikey=70d6b158d23c070db6658a8cac0da9a9`
    var finModPrepURL = finModPrepBaseURL + endPoint;
    var stckName = "";
    fetch(finModPrepURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            stckName = data.companyName;
            localStorage.setItem(stckSymb, stckName)
            renderStck();
            console.log(stckName);
        })
}



function renderStck() {
    renderPrice();
    renderNews();
}

function addFav() {
  var stckSymb = stockInputEl.val();
  var endPoint = `/api/v3/profile/${stckSymb}?apikey=70d6b158d23c070db6658a8cac0da9a9`;
  finModPrepURL = finModPrepBaseURL + endPoint;
  var stckName = "";
  fetch(finModPrepURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      stckName = data.companyName;
      console.log(stckName);
    });
  localStorage.setItem("stckSymb");
}

// USER INTERACTIONS

// user submit stock form
formEl.on("submit", addFav)

//user clicks on news article
