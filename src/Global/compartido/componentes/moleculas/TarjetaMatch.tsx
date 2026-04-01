import * as Haptics from 'expo-haptics';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { PlatoType } from '@Global/funcionalidades/matches/useMatchesStore';
import { styles } from './TarjetaMatch.styles';

interface TarjetaMatchProps {
    plato: PlatoType;
    isWeb?: boolean;
}

export function TarjetaMatch({ plato, isWeb }: TarjetaMatchProps) {
    const handlePedir = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    };

    return (
        <View style={[styles.card, isWeb && styles.cardWeb]}>
            <Image source={{ uri: plato.foto }} style={[styles.image, isWeb && styles.imageWeb]} />
            <View style={[styles.info, isWeb && styles.infoWeb]}>
                <Text style={styles.nombre} numberOfLines={isWeb ? 2 : 1}>{plato.nombre}</Text>
                <Text style={styles.restaurante}>🍽️ {plato.restaurante}</Text>
                <Text style={styles.distancia}>📍 {plato.distancia}km de distancia</Text>
                {isWeb && (
                    <TouchableOpacity style={styles.botonWeb} onPress={handlePedir}>
                        <Text style={styles.botonWebTexto}>Pedir Ahora 🛵</Text>
                    </TouchableOpacity>
                )}
            </View>
            {!isWeb && (
                <TouchableOpacity style={styles.boton} onPress={handlePedir}>
                    <Text style={styles.botonIcono}>🛵</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}