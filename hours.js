var apiKey = "00a4dcdc-e561-4488-9ba2-c901d2350bea";
var apiKeyUrl = "?api_key=" + apiKey;
var host = "https://prod.api.pvp.net/api/lol/";
var version = "/v1.3";

$(document).ready(function() {
  var progressBar = $('#progress-bar');
  progressBar.on("transitionend", showHoursHideBar);
  $('#recalculate').on("click", showFromHideHours);
});

function getHours(region, summonerName) {
  showBarHideForm();
  region = region.value.toLowerCase();
  summonerName = summonerName.value.toLowerCase();
  var summonerId = getSummonerId(region, summonerName);
  console.log(summonerId);
  
  var games = getRecentGames(region, summonerId);
  console.log(games);

  var hours = getWeekTime(games);
  console.log(hours);
  $('#hours').text(Math.round(hours.toString()));

  return false;
}

function getWeekTime(games) {
  var time = 0;
  var weekInMilSec = 7 * 24 * 60 * 60 * 1000;
  console.log(weekInMilSec);
  console.log(Date.now());

  for (var i = 0; i < games.length; i++) {
    console.log(games[i].createDate);
    if (Date.now() - games[i].createDate < weekInMilSec) {
      time += games[i].stats.timePlayed;
    }
  }
  
  return time/60/60;
}

function getRecentGames(region, summonerId) {
  var callType = "/game/by-summoner/";
  var url = host + region + version + callType + summonerId + "/recent" + apiKeyUrl;
  var games = JSON.parse(httpGet(url))
  return games.games;
}

function getSummonerId(region, summonerName) {
  var callType = "/summoner/by-name/"
  var url = host + region + version + callType + summonerName + apiKeyUrl;

  var summonerObj = JSON.parse(httpGet(url));

  return summonerObj[summonerName].id;
}

function httpGet(theUrl) {
  var req = new XMLHttpRequest();
  req.open( "GET", theUrl, false );
  req.send( null );
  return req.responseText;
}

function showBarHideForm() {
  form = $('#get-hours');
  form.toggleClass("hide");

  $('#progress').toggleClass("hide");
  progressBar = $('.progress-bar');
  progressBar.width("100%");
}

function showHoursHideBar(hours) {
  $('#progress').toggleClass("hide");
  $('#progress-bar').width(0);
  $('#hours-container').toggleClass("hide");
}

function showFromHideHours() {
  $('#hours-container').toggleClass("hide");
  $('#get-hours').toggleClass("hide");
}
