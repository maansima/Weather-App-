

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


// var hpnm092_prj_no = "92";
// var hpnm092_prj_nm = "hpnm092";
// var hpnm092_ball_num = 150;
// var hpnm092_ball_sbt_num = 1;
// var hpnm092_subball_num = 5;
// var hpnm092_subball_sbt_num = 3;

// var hpnm092_i, hpnm092_n;
// var hpnm092_obj;
// var hpnm092_img;
// var hpnm092_obj_sub;
// var hpnm092_img_sub;

// var hpnm092_preimg = new Array();
// hpnm092_preimg[0] = new Image();
// hpnm092_preimg[0].src = "https://www.hapinemu.net/fobp/bp092/ball1.gif";
// hpnm092_preimg[1] = new Image();
// hpnm092_preimg[1].src = "https://www.hapinemu.net/fobp/bp092/ball2.gif";

// var hpnm092_preimg_sub = new Array();
// hpnm092_preimg_sub[0] = new Image();
// hpnm092_preimg_sub[0].src = "https://www.hapinemu.net/fobp/bp092/subball1.gif";
// hpnm092_preimg_sub[1] = new Image();
// hpnm092_preimg_sub[1].src = "https://www.hapinemu.net/fobp/bp092/subball1.gif";
// hpnm092_preimg_sub[2] = new Image();
// hpnm092_preimg_sub[2].src = "https://www.hapinemu.net/fobp/bp092/subball1.gif";

// var hpnm092_objBody = document.getElementsByTagName("body").item(0);
// var hpnm092_elem;
// for (hpnm092_i = 1; hpnm092_i <= hpnm092_ball_num; hpnm092_i++) {
//   hpnm092_elem = document.createElement('div');
//   hpnm092_elem.id = hpnm092_prj_nm + '_ball' + hpnm092_i;
//   hpnm092_elem.innerHTML = '<img id="' + hpnm092_prj_nm + '_ball_img' + hpnm092_i + '" style="border:0;">';
//   hpnm092_elem.style.position = 'absolute';
//   hpnm092_elem.style.visibility = 'hidden';
//   hpnm092_elem.style.margin = '0px';
//   hpnm092_elem.style.padding = '0px';
//   hpnm092_objBody.appendChild(hpnm092_elem);
//   for (hpnm092_n = 1; hpnm092_n <= hpnm092_subball_num; hpnm092_n++) {
//     hpnm092_elem = document.createElement('div');
//     hpnm092_elem.id = hpnm092_prj_nm + '_subball' + hpnm092_i + hpnm092_n;
//     hpnm092_elem.innerHTML = '<img id="' + hpnm092_prj_nm + '_subball_img' + hpnm092_i + hpnm092_n + '" style="border:0;">';
//     hpnm092_elem.style.position = 'absolute';
//     hpnm092_elem.style.visibility = 'hidden';
//     hpnm092_elem.style.margin = '0px';
//     hpnm092_elem.style.padding = '0px';
//     hpnm092_objBody.appendChild(hpnm092_elem);
//   }
// }

// function hpnm092_getViewTop() {
//   if (window.scrollY) return window.scrollY;
//   if (window.pageYOffset) return window.pageYOffset;
//   if (document.documentElement && document.documentElement.scrollTop) {
//     return document.documentElement.scrollTop;
//   }
//   else if (document.body && document.body.scrollTop) {
//     return document.body.scrollTop;
//   }
//   return 0;
// }

// function hpnm092_getViewLeft() {
//   if (window.scrollX) return window.scrollX;
//   if (window.pageXOffset) return window.pageXOffset;
//   if (document.documentElement && document.documentElement.scrollLeft) {
//     return document.documentElement.scrollLeft;
//   }
//   else if (document.body && document.body.scrollLeft) {
//     return document.body.scrollLeft;
//   }
//   return 0;
// }

// function hpnm092_getViewHeight() {
//   if (window.innerHeight) return window.innerHeight;
//   if (document.documentElement && document.documentElement.clientHeight) {
//     return document.documentElement.clientHeight;
//   }
//   else if (document.body && document.body.clientHeight) {
//     return document.body.clientHeight;
//   }
//   return 0;
// }

// function hpnm092_getViewWidth() {
//   if (window.innerWidth) return window.innerWidth;
//   if (document.documentElement && document.documentElement.clientWidth) {
//     return document.documentElement.clientWidth;
//   }
//   else if (document.body && document.body.clientWidth) {
//     return document.body.clientWidth;
//   }
//   return 0;
// }

// function hpnm092_getViewBottom() {
//   return hpnm092_getViewTop() + hpnm092_getViewHeight();
// }

// function hpnm092_getViewRight() {
//   return hpnm092_getViewLeft() + hpnm092_getViewWidth();
// }

// function hpnm092_getRandomNum(num) {
//   return Math.floor(Math.random() * num);
// }

// function hpnm092_setOpacity(elem, op) {
//   elem.style.filter = 'alpha(opacity=' + (op * 100) + ')';
//   elem.style.MozOpacity = op;
//   elem.style.opacity = op;
// }
// var hpnm092_action = new Array();
// var hpnm092_actioncnt = new Array();
// var hpnm092_balltop = new Array();
// var hpnm092_balltop_to = new Array();
// var hpnm092_ballleft = new Array();
// var hpnm092_ballspeed = new Array();
// var hpnm092_ballopacity = new Array();
// var hpnm092_balltype = new Array();
// var hpnm092_subballtop = new Array();
// var hpnm092_subballleft = new Array();
// var hpnm092_subballmovelr = new Array();
// var hpnm092_subballspeedv = new Array();
// var hpnm092_subballspeedh = new Array();

// for (hpnm092_i = 1; hpnm092_i <= hpnm092_ball_num; hpnm092_i++) {
//   hpnm092_action[hpnm092_i] = 0;
//   hpnm092_subballtop[hpnm092_i] = new Array();
//   hpnm092_subballleft[hpnm092_i] = new Array();
//   hpnm092_subballmovelr[hpnm092_i] = new Array();
//   hpnm092_subballspeedv[hpnm092_i] = new Array();
//   hpnm092_subballspeedh[hpnm092_i] = new Array();
//   hpnm092_ballopacity[hpnm092_i] = new Array();
// }


// function hpnm092_fire() {

//   var hpnm092_viewbottom = hpnm092_getViewBottom();
//   var hpnm092_viewright = hpnm092_getViewRight() - 40;
//   var hpnm092_viewtop = hpnm092_getViewTop();
//   var hpnm092_viewleft = hpnm092_getViewLeft();

//   for (hpnm092_i = 1; hpnm092_i <= hpnm092_ball_num; hpnm092_i++) {
//     hpnm092_obj = document.getElementById(hpnm092_prj_nm + '_ball' + hpnm092_i);
//     hpnm092_img = document.getElementById(hpnm092_prj_nm + '_ball_img' + hpnm092_i);

//     switch (hpnm092_action[hpnm092_i]) {
//       case 0:
//         if (hpnm092_getRandomNum(100) == 0) {
//           hpnm092_balltype[hpnm092_i] = hpnm092_getRandomNum(hpnm092_ball_sbt_num) + 1;
//           hpnm092_img.src = hpnm092_preimg[0].src;
//           hpnm092_balltop[hpnm092_i] = hpnm092_viewtop - hpnm092_img.height;
//           hpnm092_ballleft[hpnm092_i] = (hpnm092_viewleft + hpnm092_getRandomNum(hpnm092_viewright - hpnm092_viewleft - 20));
//           hpnm092_ballspeed[hpnm092_i] = 30;
//           hpnm092_balltop_to[hpnm092_i] = (hpnm092_viewtop + hpnm092_getRandomNum(hpnm092_viewbottom - hpnm092_viewtop - 250)) + 150;
//           hpnm092_obj.style.top = hpnm092_balltop[hpnm092_i] + 'px';
//           hpnm092_obj.style.left = hpnm092_ballleft[hpnm092_i] + 'px';
//           hpnm092_obj.style.visibility = 'visible';
//           hpnm092_action[hpnm092_i] = 1;
//           hpnm092_actioncnt[hpnm092_i] = 0;
//           hpnm092_ballopacity[hpnm092_i] = 0.5;
//           hpnm092_setOpacity(hpnm092_obj, hpnm092_ballopacity[hpnm092_i]);
//         }

//         break;

//       case 1:
//         hpnm092_balltop[hpnm092_i] += hpnm092_ballspeed[hpnm092_i];
//         if (hpnm092_balltop[hpnm092_i] < hpnm092_balltop_to[hpnm092_i] - 50) {
//           hpnm092_obj.style.top = hpnm092_balltop[hpnm092_i] + 'px';
//           hpnm092_actioncnt[hpnm092_i]++;
//         }
//         else {
//           hpnm092_balltop[hpnm092_i] = hpnm092_balltop_to[hpnm092_i];
//           hpnm092_obj.style.top = hpnm092_balltop[hpnm092_i] + 'px';
//           hpnm092_img.src = hpnm092_preimg[hpnm092_balltype[hpnm092_i]].src;
//           hpnm092_ballopacity[hpnm092_i] = 0.3;
//           hpnm092_setOpacity(hpnm092_obj, hpnm092_ballopacity[hpnm092_i]);
//           hpnm092_obj.style.left = (hpnm092_ballleft[hpnm092_i] - 15) + 'px';
//           for (hpnm092_n = 1; hpnm092_n <= hpnm092_subball_num; hpnm092_n++) {
//             hpnm092_obj_sub = document.getElementById(hpnm092_prj_nm + '_subball' + hpnm092_i + hpnm092_n);
//             hpnm092_img_sub = document.getElementById(hpnm092_prj_nm + '_subball_img' + hpnm092_i + hpnm092_n);

//             hpnm092_img_sub.src = hpnm092_preimg_sub[hpnm092_getRandomNum(hpnm092_subball_sbt_num)].src;

//             hpnm092_subballtop[hpnm092_i][hpnm092_n] = hpnm092_balltop_to[hpnm092_i] + 15;
//             hpnm092_subballleft[hpnm092_i][hpnm092_n] = hpnm092_ballleft[hpnm092_i];
//             hpnm092_subballmovelr[hpnm092_i][hpnm092_n] = hpnm092_getRandomNum(2);
//             hpnm092_subballspeedv[hpnm092_i][hpnm092_n] = hpnm092_getRandomNum(3) + 1;
//             hpnm092_subballspeedh[hpnm092_i][hpnm092_n] = hpnm092_getRandomNum(3) + 1;

//             hpnm092_obj_sub.style.top = hpnm092_subballtop[hpnm092_i][hpnm092_n] + 'px';
//             hpnm092_obj_sub.style.left = hpnm092_subballleft[hpnm092_i][hpnm092_n] + 'px';
//             hpnm092_obj_sub.style.visibility = 'visible';
//           }
//           hpnm092_action[hpnm092_i] = 2;
//           hpnm092_actioncnt[hpnm092_i] = 0;
//         }

//         break;

//       case 2:

//         for (hpnm092_n = 1; hpnm092_n <= hpnm092_subball_num; hpnm092_n++) {
//           hpnm092_obj_sub = document.getElementById(hpnm092_prj_nm + '_subball' + hpnm092_i + hpnm092_n);
//           hpnm092_img_sub = document.getElementById(hpnm092_prj_nm + '_subball_img' + hpnm092_i + hpnm092_n);

//           hpnm092_subballtop[hpnm092_i][hpnm092_n] -= (20 - hpnm092_actioncnt[hpnm092_i]) * hpnm092_subballspeedv[hpnm092_i][hpnm092_n] / 8;
//           hpnm092_subballleft[hpnm092_i][hpnm092_n] -= (hpnm092_subballmovelr[hpnm092_i][hpnm092_n] == 0 ? 1 : -1) * hpnm092_subballspeedh[hpnm092_i][hpnm092_n] / 2;

//           if (hpnm092_subballleft[hpnm092_i][hpnm092_n] < hpnm092_viewright) {
//             hpnm092_obj_sub.style.top = hpnm092_subballtop[hpnm092_i][hpnm092_n] + 'px';
//             hpnm092_obj_sub.style.left = hpnm092_subballleft[hpnm092_i][hpnm092_n] + 'px';
//           }
//           else {
//             hpnm092_obj_sub.style.top = '0px';
//             hpnm092_obj_sub.style.left = '0px';
//             hpnm092_obj_sub.style.visibility = 'hidden';
//           }
//         }

//         if (hpnm092_actioncnt[hpnm092_i] < 20) {
//           hpnm092_actioncnt[hpnm092_i]++;
//         }
//         else {
//           hpnm092_action[hpnm092_i] = 3;
//           hpnm092_actioncnt[hpnm092_i] = 0;
//         }

//         break;

//       case 3:

//         for (hpnm092_n = 1; hpnm092_n <= hpnm092_subball_num; hpnm092_n++) {
//           hpnm092_obj_sub = document.getElementById(hpnm092_prj_nm + '_subball' + hpnm092_i + hpnm092_n);
//           hpnm092_img_sub = document.getElementById(hpnm092_prj_nm + '_subball_img' + hpnm092_i + hpnm092_n);

//           hpnm092_subballtop[hpnm092_i][hpnm092_n] += hpnm092_actioncnt[hpnm092_i] * hpnm092_subballspeedv[hpnm092_i][hpnm092_n] / 8;
//           hpnm092_subballleft[hpnm092_i][hpnm092_n] -= (hpnm092_subballmovelr[hpnm092_i][hpnm092_n] == 0 ? 1 : -1) * hpnm092_subballspeedh[hpnm092_i][hpnm092_n] / 2;
//           if (hpnm092_subballleft[hpnm092_i][hpnm092_n] < hpnm092_viewright) {
//             hpnm092_obj_sub.style.top = hpnm092_subballtop[hpnm092_i][hpnm092_n] + 'px';
//             hpnm092_obj_sub.style.left = hpnm092_subballleft[hpnm092_i][hpnm092_n] + 'px';
//           }
//           else {
//             hpnm092_obj_sub.style.top = '0px';
//             hpnm092_obj_sub.style.left = '0px';
//             hpnm092_obj_sub.style.visibility = 'hidden';
//           }
//         }

//         if (hpnm092_actioncnt[hpnm092_i] < 10) {
//           hpnm092_actioncnt[hpnm092_i]++;
//         }
//         else {
//           hpnm092_action[hpnm092_i] = 4;
//           hpnm092_actioncnt[hpnm092_i] = 0;
//           for (hpnm092_n = 1; hpnm092_n <= hpnm092_subball_num; hpnm092_n++) {
//             hpnm092_obj_sub = document.getElementById(hpnm092_prj_nm + '_subball' + hpnm092_i + hpnm092_n);
//             hpnm092_img_sub = document.getElementById(hpnm092_prj_nm + '_subball_img' + hpnm092_i + hpnm092_n);

//             hpnm092_obj_sub.style.top = '0px';
//             hpnm092_obj_sub.style.left = '0px';
//             hpnm092_obj_sub.style.visibility = 'hidden';
//           }
//         }

//         break;

//       case 4:

//         if (hpnm092_actioncnt[hpnm092_i] < 10) {
//           hpnm092_actioncnt[hpnm092_i]++;
//         }
//         else if (hpnm092_actioncnt[hpnm092_i] < 16) {
//           hpnm092_ballopacity[hpnm092_i] -= 0.05;
//           hpnm092_setOpacity(hpnm092_obj, hpnm092_ballopacity[hpnm092_i]);
//           hpnm092_actioncnt[hpnm092_i]++;
//         }
//         else {
//           hpnm092_obj.style.top = '0px';
//           hpnm092_obj.style.left = '0px';
//           hpnm092_obj.style.visibility = 'hidden';
//           hpnm092_action[hpnm092_i] = 0;
//           hpnm092_actioncnt[hpnm092_i] = 0;
//         }

//         break;

//     }

//   }

//   setTimeout("hpnm092_fire()", 30);

// }

// hpnm092_fire();

// var hpnm092_rsurl = "http://www.hapinemu.net/researchbp2.php?kbn=" + hpnm092_prj_no + "&ref=" + encodeURI(document.URL) + "&name=" + encodeURI(hpnm092_prj_nm);
// document.write('<iframe src="' + hpnm092_rsurl + '" height=0 width=0 frameborder=0 scrolling=no></iframe>');


