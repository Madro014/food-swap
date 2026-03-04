import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Text, View, useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { PlatoType } from '../../funcionalidades/matches/useMatchesStore';
import { styles } from './TarjetaTinder.styles';

interface TarjetaDeComidaProps {
    plato: PlatoType;
    alAceptar: (plato: PlatoType) => void;
    alRechazar: (plato: PlatoType) => void;
}

export default function TarjetaDeComida({ plato, alAceptar, alRechazar }: TarjetaDeComidaProps) {
    const { width: AnchoPantalla } = useWindowDimensions();
    const x = useSharedValue(0);
    const y = useSharedValue(0);
    const comienzoX = useSharedValue(0);
    const comienzoY = useSharedValue(0);

    const deslizarGesto = Gesture.Pan()
        .onStart(() => {
            comienzoX.value = x.value;
            comienzoY.value = y.value;
        })
        .onUpdate((evento) => {
            x.value = comienzoX.value + evento.translationX;
            y.value = comienzoY.value + evento.translationY;
        })
        .onEnd((evento) => {
            if (evento.translationX > 100) {
                x.value = withSpring(AnchoPantalla + 100);
                if (alAceptar) runOnJS(alAceptar)(plato);
            } else if (evento.translationX < -100) {
                x.value = withSpring(-AnchoPantalla - 100);
                if (alRechazar) runOnJS(alRechazar)(plato);
            } else {
                x.value = withSpring(0);
                y.value = withSpring(0);
            }
        });

    const estiloMovimiento = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: x.value },
                { translateY: y.value },
                { rotate: `${x.value / 20}deg` }
            ],
        };
    });

    // Animación de los sellos (LIKE / NOPE)
    const estiloLike = useAnimatedStyle(() => {
        const opacity = interpolate(x.value, [0, 50], [0, 1]);
        return {
            opacity: Math.max(0, Math.min(1, opacity)),
        };
    });

    const estiloNope = useAnimatedStyle(() => {
        const opacity = interpolate(x.value, [0, -50], [0, 1]);
        return {
            opacity: Math.max(0, Math.min(1, opacity)),
        };
    });

    return (
        <GestureDetector gesture={deslizarGesto}>
            <Animated.View style={[styles.cardWrapper, estiloMovimiento]}>
                <View style={styles.card}>
                    <Image source={{ uri: plato.foto }} style={styles.image} />

                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.85)']}
                        style={styles.gradient}
                    >
                        <View style={styles.infoContainer}>
                            <Text style={styles.name}>{plato.nombre}</Text>
                            <View style={styles.detailsRow}>
                                <Text style={styles.restaurant}>{plato.restaurante}</Text>
                                <View style={styles.distanceBadge}>
                                    <Text style={styles.distance}>{plato.distancia} km</Text>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>

                    {/* Badge LIKE */}
                    <Animated.View style={[styles.badge, styles.likeBadge, estiloLike]}>
                        <Text style={[styles.badgeText, styles.likeText]}>LIKE</Text>
                    </Animated.View>

                    {/* Badge NOPE */}
                    <Animated.View style={[styles.badge, styles.nopeBadge, estiloNope]}>
                        <Text style={[styles.badgeText, styles.nopeText]}>NOPE</Text>
                    </Animated.View>
                </View>
            </Animated.View>
        </GestureDetector>
    );
}