import { HeaderApp } from '@Global/compartido/componentes/organismos/HeaderApp';
import { PilaDeCartas } from '@Global/compartido/componentes/organismos/PilaDeCartas';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { useAuthStore } from '../auth/useAuthStore';
import { PlatoType, useMatchesStore } from '../matches/useMatchesStore';
import { usePlatos } from './usePlatos';
import { styles } from './PlatosVista.styles';
import { geoService } from '@backend/geoService';

export default function VistaDePlatos() {
    const { platos, cargando, quitar, sessionId } = usePlatos();
    const { userName, userAvatar, logout, token } = useAuthStore();
    const agregarMatch = useMatchesStore(state => state.agregarMatch);
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.replace('/login');
    };

    const manejarMeGusta = async (plato: PlatoType) => {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        agregarMatch(plato);
        quitar(plato.id);
        if (token && sessionId) {
            await geoService.registrarSwipe(token, sessionId, plato.id, 'right');
        }
    };

    const manejarNoMeGusta = async (plato: PlatoType) => {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        quitar(plato.id);
        if (token && sessionId) {
            await geoService.registrarSwipe(token, sessionId, plato.id, 'left');
        }
    };

    return (
        <View style={styles.container}>
            <HeaderApp userName={userName} userAvatar={userAvatar} onLogout={handleLogout} />
            <PilaDeCartas
                platos={platos}
                cargando={cargando}
                onAceptar={manejarMeGusta}
                onRechazar={manejarNoMeGusta}
            />
        </View>
    );
}