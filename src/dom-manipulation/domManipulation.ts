import { DayOfWeek, WeatherIcon, WeatherIcontype, WeatherResponse } from "../model/weatherResponse";

export const buttonClick = document.getElementById("button-location");
const temperature =  document.getElementById("weather-temp");
const weatherDescription = document.getElementById("weather-desc");
const WeatherIconPng = document.getElementById("weather-icon");
const LocationText = document.getElementById("location-text");
const DateDayName = document.getElementById("date-dayname");
const DateDay = document.getElementById("date-day");
const maxTemp = document.getElementById("text-temp-max");
const minTemp = document.getElementById("text-temp-min");
const humidity = document.getElementById("text-humidity");
const wind = document.getElementById("text-wind");
const locationInput = document.getElementById("weather-location-input");
const errorBox = document.getElementById("error-box");
const loader = document.getElementById("loader");

/**
 * Interface de matricula de visualizacion
 * @param weather
 */
export const updateInteface = (weather: WeatherResponse) :void => {
    
    if (temperature) temperature.textContent = Math.floor(weather.main.temp).toString() + "ºC";
    if (weatherDescription) weatherDescription.textContent = weather.weather[0].main;
    changeWeatherIcon(weather.weather[0].icon ?? '01d');

    if (LocationText) LocationText.textContent = weather.name;
    if (DateDayName) DateDayName.textContent = getDayOfWeek();
    if (DateDay) DateDay.textContent = getDate();
    if (locationInput) { // @ts-ignore
        locationInput.value = weather.name;
    }
    if (maxTemp) maxTemp.textContent = Math.floor(weather.main.temp_max) + " ºC";
    if (minTemp) minTemp.textContent = Math.floor(weather.main.temp_min) + " ºC";
    if (humidity) humidity.textContent = weather.main.humidity.toString() + " %";
    if (wind) wind.textContent = weather.wind.speed.toString() + " m/s";

}

/**
 * Funcion encargada de obtener la ciudad ingresada.
 */
export function getCity(): string {
    if(locationInput) {
        return (locationInput as HTMLInputElement).value;
    }
    return "";
}

/**
 * Funcion encarga de asignar una ciudad al input
 * @param city
 */
export function setCity(city: string) {
    if(locationInput) {
        (locationInput as HTMLInputElement).value = city;
    }
}

/**
 * Funcion encargada de mostrar/ocultar mensaje de error
 * @param error
 * @param show
 */
export function showHideError(error: string | null , show: boolean) {
    if(errorBox) {
        errorBox.textContent = error;
        errorBox.style.display = show ? "block" : "none";
    }
}

/**
 * Funcion encargada de mostrar el loader
 * @param show
 */
export function showHideLoader(show: boolean) {
    if(loader) {
        // @ts-ignore
        locationInput.disabled = show;
        loader.style.visibility = show ? "visible" : "hidden";
    }
}


/**
 * Funcion encargada de obtener el dia de la semana
 */
function getDayOfWeek(): string {
    let day = new Date();
    return DayOfWeek[day.getDay()];
}

/**
 * Funcion encargada de obtener la fecha
 */
function getDate(): string {
    let date = new Date();
    return date.toLocaleDateString("es-ES");
}

/**
 * Funcion encargada de cambiar el icono de la temperatura
 * @param weatherImageRef
 */
function changeWeatherIcon(weatherImageRef: string) {
    const weatherMap = [weatherImageRef];
    validateImage(weatherMap);
    const mappedWeather = weatherMap.map(weather => WeatherIcon[weather])[0] ?? WeatherIcon["01d"];
    if(typeof mappedWeather[0] === "string") {
        if (WeatherIconPng) (WeatherIconPng as HTMLImageElement).src = mappedWeather;
    }
}

/**
 * Funcion encargada de validar si el icono es valido
 * @param values
 */
function validateImage(values: string[]): asserts values is WeatherIcontype[] {
    if (!values.every(isValidImage)) {
        throw Error('invalid image');    
    }
}

/**
 * Funcion encargada de validar si el icono es valido
 * @param value
 */
function isValidImage(value: string): value is WeatherIcontype {
    return value in WeatherIcon;
}