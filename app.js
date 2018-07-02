

(function () {
  var DARKSKY_API_URL = 'http://api.darksky.net/forecast/';
  var DARKSKY_API_KEY = '8a757f82430355eb0678585ea2a04537';
  var CORS_PROXY = 'http://cors-anywhere.herokuapp.com/';

  var GOOGLE_MAPS_API_KEY = 'AIzaSyDElpH46RpY_dOhzaFtoV1mxYeb4_QZvSs';
  var GOOGLE_MAPS_API_URL = 'http://maps.googleapis.com/maps/api/geocode/json';

  function getCurrentWeather(coords) {
    var url = `${CORS_PROXY}${DARKSKY_API_URL}${DARKSKY_API_KEY}/${coords.lat},${coords.lng}`;

    return (
      fetch(url)
        .then(response => response.json())
        .then(data => data)
    );
  }

  function getCoordinatesForCity(cityName) {
    var url = `${GOOGLE_MAPS_API_URL}?address=${cityName}&key=${GOOGLE_MAPS_API_KEY}`;

    return (
      fetch(url)
        .then(response => response.json())
        .then(data => data.results[0].geometry.location)

    );
  }

  function getAddressForCity(cityName) {
    var url = `${GOOGLE_MAPS_API_URL}?address=${cityName}&key=${GOOGLE_MAPS_API_KEY}`;

    return (
      fetch(url)
        .then(response => response.json())
        .then(data => data.results[0].formatted_address)

    );
  }



  var app = document.querySelector('#app');
  var cityForm = app.querySelector('.city-form');
  var cityInput = cityForm.querySelector('.city-input');
  var getWeatherButton = cityForm.querySelector('.get-weather-button');
  var cityWeather = app.querySelector('.city-weather');
  var windSpeed = app.querySelector('.wind-speed');
  var visibility = app.querySelector('.visibility');
  var cityAddress = app.querySelector('.address');
  var forecastHigh = app.querySelector('.forecastHigh')
  var forecastLow = app.querySelector('.forecastLow')
  var cityAddress = app.querySelector('.address')
  var dayType = app.querySelector('.type')

  function init() {
    var input = document.getElementById('locationTextField');
    var autocomplete = new google.maps.places.Autocomplete(input);
  }

  google.maps.event.addDomListener(window, 'load', init);

  cityForm.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent the form from submitting
    cityWeather.innerText = "Loading...";
    windSpeed.innerText = "";
    visibility.innerText = "";
    forecastHigh.innerText = "";
    forecastLow.innerText = "";
    cityAddress.innerText = "";
    dayType.innerText = "";
    var skycons = new Skycons({ "color": "white" });

          // $(skycons).hide();


    var city = cityInput.value;



    getCoordinatesForCity(city)
      .then(getCurrentWeather)
      .then(function (weather) {

        getAddressForCity(city).then(function (address) {

          cityAddress.innerText = address;

        })

        cityWeather.innerText = 'Temperature: ' + weather.currently.temperature + " F";
        windSpeed.innerText = 'Wind Speed: ' + weather.currently.windSpeed;
        visibility.innerText = 'Visibility: ' + weather.currently.visibility;
        forecastHigh.innerText = 'Highest Temperatures for the week:   ';
        for (var i = 0; i < 5; i++) {
          forecastHigh.innerText += '     ' + weather.daily.data[i].temperatureHigh;
        }
        forecastLow.innerText = 'Lowest Temperatures for the week:  ';
        for (var i = 0; i < 5; i++) {
          forecastLow.innerText += '    ' + weather.daily.data[i].temperatureLow;
        }

        console.log(weather)
        
          // $(skycons).show();


        skycons.add("icon1", weather.currently.icon);


        dayType.innerText = weather.hourly.summary;

  
          skycons.add("icon2", weather.daily.data[1].icon);
          skycons.add("icon3", weather.daily.data[2].icon);
          skycons.add("icon4", weather.daily.data[3].icon); 
          skycons.add("icon5", weather.daily.data[4].icon); 
          skycons.add("icon6", weather.daily.data[5].icon); 
        
          skycons.play();

      });
  });


})();


