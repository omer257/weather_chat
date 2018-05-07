class WeatherRender {
  constructor() {
  }
  renderReport(citiesArray,sortState){
    //hide/show sort buttons
    if(citiesArray.length==0) $(".sort").hide();
    else $(".sort").show();

    //sort array befor render
    if(sortState == "name"){
      citiesArray.sort(function(a, b){return a.name>b.name});
    }
    else if ( sortState == "temp") {
      citiesArray.sort(function(a, b){return a.temp-b.temp});
    }
    else if ( sortState == "date") {
      citiesArray.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      });
    }

    $('.cities').empty();
    var source = $('#template-cities').html();
    var template = Handlebars.compile(source);
    var newHTML = template({cities : citiesArray});
    $('.cities').append(newHTML);
  }
}
export {WeatherRender};
