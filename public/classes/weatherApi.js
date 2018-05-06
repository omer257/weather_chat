class WeatherApi {
  constructor() {
    this.apiUrl="http://api.openweathermap.org/data/2.5/weather?APPID=4573c189d467ca1814c1c10000060792&q="
  }
  getWeather(cityName){
    return $.ajax( this.apiUrl + cityName );
  }
}
export {WeatherApi};
