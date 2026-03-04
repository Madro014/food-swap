import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import React, { useEffect, useReducer } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import TarjetaDeComida from '../../compartido/componentes/TarjetaTinder';
import { pedirPermisosUbicacion } from '../../servicios/UbicacionServicio';
import { useAuthStore } from '../auth/useAuthStore';
import { useMatchesStore } from '../matches/useMatchesStore';
import { styles } from './PlatosVista.styles';

type Estado = { comidasCerca: any[]; cargando: boolean };
type Accion =
    | { type: 'CARGANDO' }
    | { type: 'LISTO'; payload: any[] }
    | { type: 'QUITAR'; id: number };

function reducer(estado: Estado, accion: Accion): Estado {
    switch (accion.type) {
        case 'CARGANDO':
            return { ...estado, cargando: true };
        case 'LISTO':
            return { comidasCerca: accion.payload, cargando: false };
        case 'QUITAR':
            return { ...estado, comidasCerca: estado.comidasCerca.filter((p) => p.id !== accion.id) };
        default:
            return estado;
    }
}

export default function VistaDePlatos() {
    const [{ comidasCerca, cargando }, dispatch] = useReducer(reducer, { comidasCerca: [], cargando: true });
    const { userName, userAvatar, logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.replace('/login');
    };

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

            const lista = ubi
                ? platosFalsos.filter((p) => p.distancia <= 5).reverse()
                : platosFalsos.reverse();

            dispatch({ type: 'LISTO', payload: lista });
        }

        cargarComidita();
    }, []);

    const manejarMeGusta = async (plato: any) => {
        console.log("¡Me gusta! " + plato.nombre);
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        useMatchesStore.getState().agregarMatch(plato);
        dispatch({ type: 'QUITAR', id: plato.id });
    };

    const manejarNoMeGusta = async (plato: any) => {
        console.log("Rechazado: " + plato.nombre);
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        dispatch({ type: 'QUITAR', id: plato.id });
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
                {/* Logo and App Name */}
                <View style={styles.logoContainer}>
                    <Image
                        source={{ uri: 'https://res.cloudinary.com/dzdgdqoap/image/upload/v1772550710/foodmatch_osnrsz.png' }}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>FoodMatch</Text>
                </View>

                {/* User Info and Logout */}
                <View style={styles.userInfoContainer}>
                    <View style={styles.userProfile}>
                        <Image
                            source={{ uri: userAvatar || 'https://api.dicebear.com/7.x/notionists/png?seed=Felix&backgroundColor=f3f4f6' }}
                            style={styles.userAvatar}
                        />
                        <Text style={styles.userName} numberOfLines={1}>{userName || 'Invitado'}</Text>
                    </View>

                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <SymbolView name="rectangle.portrait.and.arrow.right" size={20} tintColor="#FF6B6B" />
                    </TouchableOpacity>
                </View>
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