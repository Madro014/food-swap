import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import TarjetaDeComida from '../../compartido/componentes/TarjetaTinder';
import { comprobarSiEstaCerca, pedirPermisosUbicacion } from '../../servicios/UbicacionServicio';

// aca traemos y juntamos todo: los platos de comida y la tarjeta que se mueve.
export default function VistaDePlatos() {
    const [comidasCerca, setComidasCerca] = useState<any[]>([]); // guardamos nuestros platillos
    const [cargando, setCargando] = useState(true);

    // todo esto ocurre al apenas entrar en la pantalla (como cuando abres los ojos y ves todo)
    useEffect(() => {
        async function cargarComidita() {
            const ubi = await pedirPermisosUbicacion();

            // platos de mentira, para probar (simulandopues que es con internet)
            const platosFalsos = [
                { id: 1, nombre: 'Pizza de Queso', restaurante: 'Pizzeria Luigi', foto: 'https://images.unsplash.com/photo-1513104890138-7c749659a591', lat: ubi?.latitud || 0, lon: ubi?.longitud || 0, distancia: 2 },
                { id: 2, nombre: 'Hamburguesa Gigante', restaurante: 'Burger Rey', foto: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd', lat: ubi?.latitud || 0, lon: ubi?.longitud || 0, distancia: 4 },
                { id: 3, nombre: 'Tacos de Carne', restaurante: 'Don Taco', foto: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b', lat: ubi?.latitud || 0, lon: ubi?.longitud || 0, distancia: 8 } // Este esta muy lejos!
            ];

            // ahora vamos si los platos estan a menos de 5 kilometros de nosotros
            if (ubi) { // si logramos tener la ubicacion de tu telefono
                const platosFiltrados = platosFalsos.filter(platon => {
                    // aca llamamos a nuestro detector magico de cercania
                    const estaCerquita = comprobarSiEstaCerca(ubi.latitud, ubi.longitud, platon.lat, platon.lon);
                    // o si la distancia en el papel dice menos de 5km, lo mostramos
                    return platon.distancia <= 5;
                });
                setComidasCerca(platosFiltrados);
            } else {
                setComidasCerca(platosFalsos); // mostramos todo si no sabemos tu ubicacion
            }

            setCargando(false); // ya terminamos de pensar!
        }

        cargarComidita();
    }, []);

    // accion cuando el usuario desliza hacia la derecha (hace match o le gusta)
    const manejarMeGusta = (plato: any) => {
        Alert.alert("¡Genial!", "Le has dado me gusta a " + plato.nombre);
        // sacamos el plato de la lista para ver el siguiente
        setComidasCerca((platosViejos) => platosViejos.filter((p) => p.id !== plato.id));
    };

    // accion cuando el usuario desliza hacia la izquierda (niega o no le gusta)
    const manejarNoMeGusta = (plato: any) => {
        // puedes poner un log si prefieres no mostrar alerta por cada rechazo
        console.log("Has rechazado a " + plato.nombre);
        // sacamos el plato de la lista para ver el siguiente
        setComidasCerca((platosViejos) => platosViejos.filter((p) => p.id !== plato.id));
    };

    if (cargando) {
        return (
            <View style={hacerLindo.caja}>
                <Text style={hacerLindo.textoLetras}>buscando comida rica a 5km de ti...</Text>
            </View>
        );
    }

    // devolvemos y dibujamos en la pantalla las tarjetas de platos
    return (
        <View style={hacerLindo.caja}>
            <Text style={hacerLindo.tituloLindo}>Platos a 5 KM 🍔</Text>

            <View style={hacerLindo.cajaTarjetas}>
                {comidasCerca.map((plato) => (
                    <TarjetaDeComida
                        key={plato.id}
                        plato={plato}
                        alAceptar={manejarMeGusta}
                        alRechazar={manejarNoMeGusta}
                    />
                ))}
            </View>
        </View>
    );
}

const hacerLindo = StyleSheet.create({
    caja: {
        flex: 1, // ocupa toda la pantalla del celu, iphone o compu
        alignItems: 'center', // al medio de los lados
        justifyContent: 'center', // al medio de arriba-abajo
        backgroundColor: '#fff7ed', // color cremita clarito de fondo
    },
    tituloLindo: {
        fontSize: 28, // grandote
        fontWeight: 'bold', // gordito
        color: '#ea580c', // color naranjita comida
        fontFamily: 'Inter_700Bold', // letricas amables
        marginBottom: 20,
    },
    cajaTarjetas: {
        height: 500, // alto de las tarjetas
        alignItems: 'center',
        justifyContent: 'center',
    },
    textoLetras: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular', // letricas normales
    }
});
