import {City} from './city.js';

class WeatherApi {
  constructor() {
    this.apiUrl="http://api.openweathermap.org/data/2.5/weather?APPID=4573c189d467ca1814c1c10000060792&q="
  }
  getWeather(cityName){
   return $.ajax({
      method: "GET",
      url: this.apiUrl + cityName
    }).then( function(data) {
        var name = data.name;
        var temp = data.main.temp - 273.15;
        temp = Math.round(temp * 100) / 100;
        var date = new Date();
        date = date.getDate() + '/' + (date.getMonth()+1) + '/' +  date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        return new City(name, temp, date);
      }
    );
  }
}
export {WeatherApi};
