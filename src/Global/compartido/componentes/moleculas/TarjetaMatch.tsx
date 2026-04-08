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

    if (isWeb) {
        // ── Web: Tarjeta vertical premium ──
        return (
            <View style={[styles.card, styles.cardWeb]}>
                <View style={{ position: 'relative' }}>
                    <Image source={{ uri: plato.foto }} style={[styles.image, styles.imageWeb]} />
                    <View style={styles.precioBadge}>
                        <Text style={styles.precioTexto}>${plato.precio}</Text>
                    </View>
                </View>
                <View style={[styles.info, styles.infoWeb]}>
                    <Text style={styles.restaurante}>🍽️ {plato.restaurante}</Text>
                    <Text style={styles.nombre} numberOfLines={2}>{plato.nombre}</Text>
                    <Text style={styles.distancia}>📍 A {plato.distancia || 0.1} km de ti</Text>
                    <TouchableOpacity style={styles.botonWeb} onPress={handlePedir}>
                        <Text style={styles.botonWebTexto}>Pedir Ahora 🛵</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // ── Mobile: Tarjeta horizontal ──
    return (
        <View style={styles.card}>
            <Image source={{ uri: plato.foto }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.nombre} numberOfLines={1}>{plato.nombre}</Text>
                <Text style={styles.restaurante}>🍽️ {plato.restaurante}</Text>
                <Text style={styles.distancia}>📍 {plato.distancia}km de distancia</Text>
            </View>
            <TouchableOpacity style={styles.boton} onPress={handlePedir}>
                <Text style={styles.botonIcono}>🛵</Text>
            </TouchableOpacity>
        </View>
    );
}