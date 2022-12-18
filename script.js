var currentDate = document.getElementById('currentDate')
var curIcon = document.getElementById('curIcon')
var curTemp = document.getElementById('curTemp')
var curWind = document.getElementById('curWind')
var curHumidity = document.getElementById('curHumidity')
var apiKey = '0ae7665de2b39d8dbacebe941b9ee171'
var city = document.getElementById('currentCity')
const currentweather = document.getElementById('currentweather')
const currentCity = document.getElementById('currentCity')
var now = moment();
const dateNow = moment().format('dddd MMMM Do YYYY')
var forcastCity = document.getElementById('forcastCity')
var forcastDate = document.getElementById('forcastDate1')
var forcastTemp = document.getElementById('forcastTemp')
var savedCity = document.getElementById('savedCity')


//fetch weather api

function fetchWeather(cityinput) {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityinput}&appid=${apiKey}&units=imperial`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            city = data.city.name
            console.log(city)
            curIcon = data.list[0].weather[0].icon
            console.log(curIcon)
            curTemp = data.list[0].main.temp
            console.log(curTemp)
            curWind = data.list[0].wind.speed
            console.log(curWind)
            curHumidity = data.list[0].main.humidity
            console.log(curHumidity)
            currentWeather(data)
            forcastTemp = data.list[1].main.temp
            var htmlforcast = ''
            for (let i = 0; i < 5; i++) {
                htmlforcast += `
                <div class="col">
                <div id="forcastCity">
                    <div id="forcastDate">Forcast</div>
                    <img id="forcastIcon" src="http://openweathermap.org/img/wn/${data.list[i * 8].weather[0].icon}@2x.png">
                    <div id="forcastTemp">${data.list[i * 8].main.temp}°</div>
                    <div id="forcastWind">${data.list[i * 8].wind.speed}mph</div>
                    <div id="forcastHumidity">${data.list[i * 8].main.humidity}%</div>
                </div>
            </div>`;
            }
            forcastCity.innerHTML = htmlforcast
        })
}







function currentWeather(data) {
    currentCity.innerHTML =
        `<div id="city"><strong>${city}</strong></div>
          <div id="currentDate">${dateNow}</div>
          <img id="forcastIcon" src="http://openweathermap.org/img/wn/${curIcon}@2x.png">
          <div id="curTemp">Temperature: ${curTemp}°</div>
          <div id="curtWind">Wind Speed: ${curWind}mph</div>
          <div id="curHumidity">Humidity: ${curHumidity}%</div>`;
}

// forcast  seactions
function forcastWeather(data) {
    forcastCity.innerHTML = `
    <div class="col">
    <div id="forcastCity">
        <div id="forcastDate">Forcast</div>
        <img id="forcastIcon" src="http://openweathermap.org/img/wn/10d@2x.png">
        <div id="forcastTemp">51°</div>
        <div id="forcastWind">6.5mph</div>
        <div id="forcastHumidity">30%</div>
    </div>
</div>`;
}

var searchedcity = JSON.parse(localStorage.getItem("searchedcity")) || []

for (let i = 0; i < searchedcity.length; i++) {
    var button = document.createElement("button")
    button.textContent = searchedcity[i]
    savedCity.appendChild(button)
    button.addEventListener("click", getWeather)
}

var form = document.getElementById('form')
var cityinput = document.getElementById('search')


// event listener for form and search
form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(cityinput.value)
    fetchWeather(cityinput.value) 
        if (cityinput.value == '') {
            alert('Please Enter A City')
        }else if (searchedcity.includes(cityinput.value)) {
            JSON.parse(localStorage.getItem("searchedcity")) || []
        }else {            
            searchedcity.push(cityinput.value)
        localStorage.setItem("searchedcity", JSON.stringify(searchedcity))
    } 
})

function getWeather(event) {
    fetchWeather(event.target.textContent)
}

