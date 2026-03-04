import { HeaderApp } from '@/src/compartido/componentes/organismos/HeaderApp';
import { PilaDeCartas } from '@/src/compartido/componentes/organismos/PilaDeCartas';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { useAuthStore } from '../auth/useAuthStore';
import { PlatoType, useMatchesStore } from '../matches/useMatchesStore';
import { usePlatos } from './usePlatos';
import { styles } from './PlatosVista.styles';

export default function VistaDePlatos() {
    const { platos, cargando, quitar } = usePlatos();
    const { userName, userAvatar, logout } = useAuthStore();
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
    };

    const manejarNoMeGusta = async (plato: PlatoType) => {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        quitar(plato.id);
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