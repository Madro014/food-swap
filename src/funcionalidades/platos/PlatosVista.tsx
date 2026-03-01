import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import TarjetaDeComida from '../../compartido/componentes/TarjetaTinder';
import { comprobarSiEstaCerca, pedirPermisosUbicacion } from '../../servicios/UbicacionServicio';
import { useMatchesStore } from '../matches/useMatchesStore';
import { styles } from './PlatosVista.styles';

export default function VistaDePlatos() {
    const [comidasCerca, setComidasCerca] = useState<any[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        async function cargarComidita() {
            const ubi = await pedirPermisosUbicacion();

            const platosFalsos = [
                { id: 1, nombre: 'Tacos al Pastor', restaurante: 'Sabor Azteca', foto: 'https://res.cloudinary.com/dzdgdqoap/image/upload/v1772406505/alimentos/r2gksri9gosxobfo7jo2.jpg', lat: ubi?.latitud || 0, lon: ubi?.longitud || 0, distancia: 1.2 },
                { id: 2, nombre: 'Combo Pollo Crujiente', restaurante: 'Crunchy Chicken', foto: 'https://res.cloudinary.com/dzdgdqoap/image/upload/v1772406596/alimentos/ugorvrr3qboc1vqool9v.jpg', lat: ubi?.latitud || 0, lon: ubi?.longitud || 0, distancia: 2.5 },
                { id: 3, nombre: 'Plato Filet Mignon', restaurante: 'Elite Bistro', foto: 'https://res.cloudinary.com/dzdgdqoap/image/upload/v1772406626/alimentos/o8itv2yk8pcfe81vg8di.jpg', lat: ubi?.latitud || 0, lon: ubi?.longitud || 0, distancia: 4.1 },
                { id: 4, nombre: 'Sushi Roll Dragón', restaurante: 'Tokyo Roll House', foto: 'https://res.cloudinary.com/dzdgdqoap/image/upload/v1772406659/alimentos/zzidpwch4jyu5gtydkvw.jpg', lat: ubi?.latitud || 0, lon: ubi?.longitud || 0, distancia: 1.8 },
                { id: 5, nombre: 'Pizza Margarita', restaurante: 'La Nonna Pizzeria', foto: 'https://res.cloudinary.com/dzdgdqoap/image/upload/v1772406686/alimentos/d4scggorjgnjnwx2mvxy.jpg', lat: ubi?.latitud || 0, lon: ubi?.longitud || 0, distancia: 0.8 },
                { id: 6, nombre: 'Hamburguesa Doble Bacon', restaurante: 'Burger City', foto: 'https://res.cloudinary.com/dzdgdqoap/image/upload/v1772406725/alimentos/t1gaovteccyglcu1eaxb.jpg', lat: ubi?.latitud || 0, lon: ubi?.longitud || 0, distancia: 3.2 },
                { id: 7, nombre: 'Ensalada César', restaurante: 'Green Life Kitchen', foto: 'https://res.cloudinary.com/dzdgdqoap/image/upload/v1772406922/alimentos/flnlailex66p4jqtgkis.jpg', lat: ubi?.latitud || 0, lon: ubi?.longitud || 0, distancia: 2.9 }
            ];

            if (ubi) {
                const platosFiltrados = platosFalsos.filter(platon => {
                    const estaCerquita = comprobarSiEstaCerca(ubi.latitud, ubi.longitud, platon.lat, platon.lon);
                    return platon.distancia <= 5;
                });
                setComidasCerca(platosFiltrados.reverse()); // reverse para que el primero en el stack sea el de indice mas alto (se ve arriba)
            } else {
                setComidasCerca(platosFalsos.reverse());
            }

            setCargando(false);
        }

        cargarComidita();
    }, []);

    const manejarMeGusta = async (plato: any) => {
        console.log("¡Me gusta! " + plato.nombre);

        // Efecto haptico al dar "Me gusta" (Vibración de Éxito)
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

        // Guardamos en el estado de Zustand
        useMatchesStore.getState().agregarMatch(plato);

        setComidasCerca((platosViejos) => platosViejos.filter((p) => p.id !== plato.id));
    };

    const manejarNoMeGusta = async (plato: any) => {
        console.log("Rechazado: " + plato.nombre);

        // Efecto haptico al dar "No me gusta" (Vibración de Ligero toque / Error)
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

        setComidasCerca((platosViejos) => platosViejos.filter((p) => p.id !== plato.id));
    };

    if (cargando) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF6B6B" />
                <Text style={styles.loadingText}>Buscando comida rica cerca...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerSpace}>
                <Text style={styles.title}>FoodMatchApp</Text>
            </View>

            <View style={styles.cardsContainer}>
                {comidasCerca.length > 0 ? (
                    comidasCerca.map((plato) => (
                        <TarjetaDeComida
                            key={plato.id}
                            plato={plato}
                            alAceptar={manejarMeGusta}
                            alRechazar={manejarNoMeGusta}
                        />
                    ))
                ) : (
                    <View style={styles.noMoreCardsContainer}>
                        <Text style={styles.noMoreCardsText}>¡No hay más platos!</Text>
                        <Text style={styles.noMoreCardsSub}>Vuelve más tarde o amplía tu búsqueda.</Text>
                    </View>
                )}
            </View>

            {/* botones decorativos para indicar a que lado deslizar */}
            <View style={styles.actionsContainer}>
                <View style={styles.actionButton}>
                    <Text style={[styles.actionIcon, { color: '#F87171' }]}>❌</Text>
                </View>
                <View style={[styles.actionButton, { width: 50, height: 50, borderRadius: 25 }]}>
                    <Text style={[styles.actionIcon, { fontSize: 22, color: '#38BDF8' }]}>⭐</Text>
                </View>
                <View style={styles.actionButton}>
                    <Text style={[styles.actionIcon, { color: '#4ADE80' }]}>💚</Text>
                </View>
            </View>
        </View>
    );
}
