## Global Variables

- inputFormEl = $("#form")- targets the entire form element
- inputSearchEl = $("#search")- targets just the search bar
- newsCard = $(".news-container")- targets the news card <div> element
- favStockArr = JSON.parse(localStorage.getItem("SavedStocks"))- list of saved stocks out of localstorage
- possibleSymbols = []- list of all potential stock symbols in autocomplete
- stockSymbolsURL = `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=70d6b158d23c070db6658a8cac0da9a9`
- finModPrepBaseURL = `https://financialmodelingprep.com` - base URL for FMP
- stockSymb = inputSearchEl.val()- user input from inputSearchEl
- articleLimit = favStockArr.length \* 3 - sets a limit on the number of news articles pulled for stocks
