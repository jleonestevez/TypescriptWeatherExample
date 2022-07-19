import {showHideError, showHideLoader, updateInteface} from "./dom-manipulation/domManipulation";
import {Location} from "./model/weatherResponse";
import {getWeather} from "./networking/weather";

/**
 * Clase encargada de obtener y gestionar permisos y coordenada del navegador
 */
export class GeoLocationBrowser {

    async  success(position: any) {
        console.log("Got position", position.coords);
        const cords = new Location(position.coords.latitude, position.coords.longitude);
        const weather = await getWeather(null, cords);
        updateInteface(weather);
    }

     error(err: any) {
        showHideLoader(false);
        showHideError("Por favor acepta los permisos de geolocalizacion para adquirir tu ubicacion automaticamente.", true);
    }

    getCurrentPosition() {
        showHideLoader(true);
        navigator.geolocation.getCurrentPosition(this.success, this.error);
    }


}

