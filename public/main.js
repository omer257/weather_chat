import {WeatherRepository} from './classes/weatherRepository.js';
import {WeatherApi} from './classes/weatherApi.js';
import {WeatherRender} from './classes/weatherRender.js';
import {City} from './classes/city.js';

var weatherRepository = new WeatherRepository();
var weatherApi = new WeatherApi();
var weatherRender = new WeatherRender();

weatherRender.renderReport(weatherRepository.cities);

var getTempVal = function() {
  var city = $('.getTempVal').val();
  if(city!=""){
    weatherApi.getWeather(city).then( function(data){
      var name = data.name;
      var temp = data.main.temp - 273.15;
      temp = Math.round(temp * 100) / 100;
      var date = new Date();
      date = date.getDate() + '/' + (date.getMonth()+1) + '/' +  date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      var city = new City(name, temp, date);
      var cities = weatherRepository.addWeatherReport(city);
      weatherRender.renderReport(cities);
      var city = $('.getTempVal').val("");
      weatherRepository.saveToLocalStorage();
    }).catch( function(){
      console.log("Error");
    });
  }
  else alert("Empty input!");
};

$('.getTemp').on('click', function () {
  getTempVal();
});

$(".getTempVal").keypress(function(e) {
  if(e.which == 13) {
    getTempVal();
  }
});

$('.cities').on('click','.commentBtn', function () {
  var $city = $(this).closest(".city");
  var cityID = $city.data().id;
  var comment = $city.find(".commentVal").val();
  var cities = weatherRepository.addComment(cityID,comment);
  weatherRepository.saveToLocalStorage();
  weatherRender.renderReport(cities);
  $city.find('.commentVal').val("");
});

$('.cities').on('click','.deleteCity', function () {
  var cityID = $(this).closest(".city").data().id;
  var cities = weatherRepository.removeWeatherReport(cityID);
  weatherRepository.saveToLocalStorage();
  weatherRender.renderReport(cities);
});

$('.cities').on('click','.deleteComment', function () {
  var cityID = $(this).closest(".city").data().id;
  var commentID = $(this).closest(".comment").data().comment_id;
  var cities = weatherRepository.removeWeatherReportComment(cityID,commentID);
  weatherRepository.saveToLocalStorage();
  weatherRender.renderReport(cities);
});

$('.sort').on('click','.byName', function () {
  weatherRender.renderReport(weatherRepository.cities, "name");
});

$('.sort').on('click','.byDate', function () {
  weatherRender.renderReport(weatherRepository.cities, "date");
});

$('.sort').on('click','.byTemp', function () {
  weatherRender.renderReport(weatherRepository.cities, "temp");
});
