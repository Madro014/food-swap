import * as Ubicacion from 'expo-location';

// para pedir permiso al celular y saber donde estamos bro
export async function pedirPermisosUbicacion() {
  const respuesta = await Ubicacion.requestForegroundPermissionsAsync();
  if (respuesta.status !== 'granted') {
    return null; // el usuario dijo que no
  }
  
  const ubicacion = await Ubicacion.getCurrentPositionAsync({});
  return {
    latitud: ubicacion.coords.latitude,
    longitud: ubicacion.coords.longitude
  };
}

// para saber si la comida esta cerca, a 5 kilometros o menos.
export function comprobarSiEstaCerca(lat1: number, lon1: number, lat2: number, lon2: number) {
  // esta es una cuenta para medir distancias en la tierra.
  const radio = 6371; // kilometros que mide la tierra del centro al borde
  const difLat = (lat2 - lat1) * (Math.PI / 180);
  const difLon = (lon2 - lon1) * (Math.PI / 180);
  
  const a = Math.sin(difLat / 2) * Math.sin(difLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
            Math.sin(difLon / 2) * Math.sin(difLon / 2);
            
  const distancia = radio * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  
  return distancia <= 5; // si es 5 o menos, es verdadero (esta cerca)
}