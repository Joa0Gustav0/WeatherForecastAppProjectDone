//API informations
const APIAuthKey = "7453c886c1d4cedc457664da1b118841"
const APIurl = "https://api.openweathermap.org/data/2.5/weather?units=metric"

//addEventListener(eventHandler:onclick) to submit button
var userInput
const submitButton = document.querySelector('.search-container__submit-button')
submitButton.addEventListener('click', () => {
    submitButton.name = "hourglass-outline"
    userInput = document.querySelector('#search-input').value.toLowerCase()
    if (userInput == ""){
        alert('City name is required for research.')
        submitButton.name = "arrow-forward"
    }else{
        getData()
    }
})

//function for getting API data
async function getData(){
    setTabsState("deactive")
    var response = await fetch(APIurl + `&q=${userInput}` + `&appid=${APIAuthKey}`)
    if (response.ok == true){
        var data = await response.json()
        submitButton.name = "arrow-forward"
        console.log(data)
        //insert data into html
        function dataUsage(){
            cityNameElem.innerText = data.name
            cityTempElem.innerText = data.main.temp + "°C"
            cityMinTempElem.innerHTML = `<ion-icon name="arrow-down"></ion-icon>` + data.main.temp_min + "°C"
            cityMaxTempElem.innerHTML = `<ion-icon name="arrow-up"></ion-icon>` + data.main.temp_max + "°C"
            cityWindSpeedElem.innerText = data.wind.speed + "Km/h"
            cityHumidityElem.innerText = data.main.humidity + "%"
            var currentWeatherId = data.weather[0].id
            var weatherDescription = undefined
            if (Number(currentWeatherId) >= 200 &&
            Number(currentWeatherId) <= 232){
                weatherDescription = "thunderstorm"
            }else if (Number(currentWeatherId) >= 300 && 
            Number(currentWeatherId) <= 321){
                weatherDescription = "shower-rain"
            }else if (Number(currentWeatherId) >= 500 && 
            Number(currentWeatherId) <= 531){
                weatherDescription = "rain"
            }else if (Number(currentWeatherId) >= 600 && 
            Number(currentWeatherId) <= 622){
                weatherDescription = "snow"
            }else if (Number(currentWeatherId) >= 700 && 
            Number(currentWeatherId) <= 781){
                weatherDescription = "mist"
            }else if (Number(currentWeatherId) == 800){
                weatherDescription = "clean-sky"
                if (data.weather[0].icon[data.weather[0].icon.length - 1] == "n"){
                    weatherDescription = weatherDescription + "-night"
                }
            }
            else if (Number(currentWeatherId) == 801){
                weatherDescription = "few-clouds"
                if (data.weather[0].icon[data.weather[0].icon.length - 1] == "n"){
                    weatherDescription = weatherDescription + "-night"
                }
            }
            else if (Number(currentWeatherId) == 802){
                weatherDescription = "scattered-clouds"
            }else if (Number(currentWeatherId) == 803 ||
            Number(currentWeatherId) == 804){
                weatherDescription = "broken-clouds"
            }
            cityWeatherElem.style.backgroundImage = `url(media/${weatherDescription}.jpg)`
        }
        dataUsage()
        setTabsState("active")
    }else{
        submitButton.name = "arrow-forward"
        alert('City not found. | Error 404 (Not Found)')
    }
}

//Set tabs state function
const tabs = document.getElementsByClassName("containers")

const setTabsState = (setState) => {
    if (setState == "active"){
        for (var i = 0; i < tabs.length; i++){
            if (tabs[i].classList.contains("active-tab") == false){
                tabs[i].classList.add("active-tab")
            }
        }
    }else if (setState == "deactive"){
        for (var i = 0; i < tabs.length; i++){
            if (tabs[i].classList.contains("active-tab")){
                tabs[i].classList.remove("active-tab")
            }
        }
    }
}

//addEventListener(eventHandler:onclick) to return results tab button
const returnButton = document.querySelector(".results-container__close-tab-button")
returnButton.addEventListener("click", () => {
    setTabsState("deactive")
})

//addEventListener(eventHandler:onclick) change page mode button
const elemModeChangeable = document.getElementsByClassName("mode-changeable")
const logos = document.getElementsByClassName('logos')

const changePageModeButton = document.querySelector(".page-mode-button")
changePageModeButton.addEventListener("click", () => {
    if (changePageModeButton.classList.contains("light-mode") == false){
        changePageModeButton.classList.add("light-mode")
        for (var i = 0; i < logos.length; i++){
            logos[i].src = "media/logo-picture-alt.png"
        }
    }else{
        changePageModeButton.classList.remove("light-mode")
        for (var i = 0; i < logos.length; i++){
            logos[i].src = "media/logo-picture.png"
        }
    }
    for (var i = 0; i < elemModeChangeable.length; i++){
        if (elemModeChangeable[i].classList.contains("light-mode") == false){
            elemModeChangeable[i].classList.add("light-mode")
        }else{
            elemModeChangeable[i].classList.remove("light-mode")
        }
    }
})

const cityNameElem = document.querySelector('.results-container__main__city-name')
const cityTempElem = document.querySelector('.results-container__main__main-temperature')
const cityMinTempElem = document.querySelector('.results-container__main__alt-temperatures__min-temp')
const cityMaxTempElem = document.querySelector('.results-container__main__alt-temperatures__max-temp')
const cityWindSpeedElem = document.querySelector('.results-container__main__add-wind-speed-container__info__data')
const cityHumidityElem = document.querySelector('.results-container__main__add-informations__humidity-container__info__data')
const cityWeatherElem = document.querySelector(".results-container")