var curTemp = document.getElementById('curTemp')
var curIcon = document.getElementById('curIcon')
var apiKey = '0ae7665de2b39d8dbacebe941b9ee171'
var city = document.getElementById('currentCity')

//fetch weather api

function fetchWeather() {
    return fetch("https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid=0ae7665de2b39d8dbacebe941b9ee171&units=imperial")
        .then(function (response) {
            return response.json() 
        })
        .then(function (data) { 
            console.log (data) 
            city = data.name
            curIcon = data.weather.icon
            curDesc = data.weather.description
            curTemp = data.main.temp
            console.log(curTemp)
            curWind = data.wind.speed
            console.log(curWind)
            curHumidity = data.main.humidity
            console.log(curHumidity)
            currentWeather(city, curIcon, curDesc, curTemp, curWind, curHumidity, )

        });
}

fetchWeather()


function currentWeather(city, i, d, curTemp, curWind, curHumidity){
     var iconURL = `http://openweathermap.org/img/wn/${curIcon}`
          console.log(curIcon)
    // $(curIcon).append(`<div class="col">
    // <div id="curWind">"${curWind}"</div>`)
    // curIcon.innerHTML = `<img src="${iconURL + curIcon} alt="curDesc"`
    // console.log(curIcon)
}

