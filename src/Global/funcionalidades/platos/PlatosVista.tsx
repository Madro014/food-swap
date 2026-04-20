import { HeaderApp } from '@Global/compartido/componentes/organismos/HeaderApp';
import { PilaDeCartas } from '@Global/compartido/componentes/organismos/PilaDeCartas';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Alert } from 'react-native';
import { useAuthStore } from '../auth/useAuthStore';
import { PlatoType, useMatchesStore } from '../matches/useMatchesStore';
import { usePlatos } from './usePlatos';
import { styles } from './PlatosVista.styles';
import { geoService } from '@api/geoService';

export default function VistaDePlatos() {
    const { platos, cargando, quitar, sessionId } = usePlatos();
    const { userName, userAvatar, logout, token } = useAuthStore();
    const { matches, agregarMatch } = useMatchesStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.replace('/login');
    };

    const manejarMeGusta = async (plato: PlatoType) => {
        if (matches.length >= 3) return;

        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        
        // Si tiene 2 matches y va a por el tercero, avisar
        if (matches.length === 2) {
            Alert.alert(
                "¡Último Match!",
                "Has alcanzado el límite máximo permitido (3 matches). Para descubrir nuevos platos, tendrás que gestionar tus matches actuales.",
                [{ text: "Entendido" }]
            );
        }

        if (sessionId) {
            agregarMatch(plato, sessionId);
            quitar(plato.id);
            if (token) {
                await geoService.registrarSwipe(token, sessionId, plato.id, 'right');
            }
        }
    };

    const manejarNoMeGusta = async (plato: PlatoType) => {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        quitar(plato.id);
        if (token && sessionId) {
            await geoService.registrarSwipe(token, sessionId, plato.id, 'left');
        }
    };

    // Si ya completó sus 3 matches, no mostrar más platos (estado vacío premium)
    const hasLimit = matches.length >= 3;
    const platosFiltrados = hasLimit ? [] : platos;

    return (
        <View style={styles.container}>
            <HeaderApp userName={userName} userAvatar={userAvatar} onLogout={handleLogout} />
            <PilaDeCartas
                platos={platosFiltrados}
                cargando={cargando}
                onAceptar={manejarMeGusta}
                onRechazar={manejarNoMeGusta}
                limiteAlcanzado={hasLimit}
            />
        </View>
    );
}