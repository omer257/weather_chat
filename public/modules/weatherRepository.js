import {Comment} from './comment.js';

class WeatherRepository {
  constructor() {
    this.STORAGE_ID = 'WeatherChat';
    this.cities = JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]');
  }

  addWeatherReport(city){
    this.cities.push(city);
    return this.cities;
  }

  removeWeatherReport(index){
    this.cities.splice(index, 1);
    return this.cities;
  }

  removeWeatherReportComment(indexCity,indexComment){
    this.cities[indexCity].comments.splice(indexComment, 1);
    return this.cities;
  }

  addComment(index, commentString){
    var newComment = new Comment(commentString);
    this.cities[index].comments.push(newComment);
    return this.cities;
  }

  saveToLocalStorage(){
    localStorage.setItem(this.STORAGE_ID, JSON.stringify(this.cities));
  }

}
export {WeatherRepository};
