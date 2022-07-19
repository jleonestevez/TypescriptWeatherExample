// Style import

import { getWeather } from './networking/weather';
import './styles/main.scss';
import {buttonClick, getCity, showHideError, showHideLoader, updateInteface} from './dom-manipulation/domManipulation';
import {WeatherResponse} from "./model/weatherResponse";
import {GeoLocationBrowser} from "./utils";


/**
 * Funcion encargada de actualizar la interfaz con los datos de la respuesta de la API
 */
export const displayWeather = async () => {
    const city = getCity();
    if(city) {
        showHideLoader(true);
        const weather:WeatherResponse = await getWeather(city, null);
        console.log("res")
        if (weather.cod === 200) {
            debugger;
            updateInteface(weather);
            showHideError(null, false);
        } else {
            showHideError(weather.message, true);
        }

    }else {
        showHideError("Please enter a city", true);
    }
}

const geoLocationBrowser = new GeoLocationBrowser();
geoLocationBrowser.getCurrentPosition();


if (buttonClick) buttonClick.addEventListener('click', displayWeather);


