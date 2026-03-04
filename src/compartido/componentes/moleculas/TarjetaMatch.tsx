import * as Haptics from 'expo-haptics';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { PlatoType } from '@/src/funcionalidades/matches/useMatchesStore';
import { styles } from './TarjetaMatch.styles';

interface TarjetaMatchProps {
    plato: PlatoType;
}

export function TarjetaMatch({ plato }: TarjetaMatchProps) {
    const handlePedir = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    };

    return (
        <View style={styles.card}>
            <Image source={{ uri: plato.foto }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.nombre}>{plato.nombre}</Text>
                <Text style={styles.restaurante}>🍽️ {plato.restaurante} • 📍 {plato.distancia}km</Text>
            </View>
            <TouchableOpacity style={styles.boton} onPress={handlePedir}>
                <Text style={styles.botonIcono}>🛵</Text>
            </TouchableOpacity>
        </View>
    );
}
