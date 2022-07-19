import {GeoPoint, WeatherResponse} from "../model/weatherResponse";
import {showHideLoader} from "../dom-manipulation/domManipulation";

/**
 * Funcion encargada de obtener el clima de una ubicacion ya sea ciudad o coordenadas
 * @param city Ciudad a buscar
 * @param coords Coordenadas a buscar
 */
export const getWeather = async (city: string | null,coords: GeoPoint | null) :Promise<WeatherResponse> =>  {
    const requestOptions: RequestInit = {
        method: 'GET',
        redirect: 'follow'
    };
    let url: string;
    let response: any;
    if (coords) {
         url = `${process.env.REACT_APP_OPEN_WEATHER_API_URL}?lat=${coords.lat}&lon=${coords.lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`;
    } else {
         url = `${process.env.REACT_APP_OPEN_WEATHER_API_URL}?q=${city}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`;
    }
    response = await fetch(url, requestOptions).then(response => response.json());
    showHideLoader(false);
    return response
}

