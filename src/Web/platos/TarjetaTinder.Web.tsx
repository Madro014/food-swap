import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';
import { PlatoType } from '@Global/funcionalidades/matches/useMatchesStore';
import { styles } from '@Global/compartido/componentes/TarjetaTinder.styles';

interface TarjetaDeComidaProps {
    plato: PlatoType;
    alAceptar: (plato: PlatoType) => void;
    alRechazar: (plato: PlatoType) => void;
}

export function TarjetaTinderWeb({ plato, alAceptar, alRechazar }: TarjetaDeComidaProps) {
    const x = useSharedValue(0);
    const y = useSharedValue(0);

    const deslizarGesto = Gesture.Pan()
        .onUpdate((evento) => {
            x.value = evento.translationX;
            y.value = evento.translationY;
        })
        .onEnd((evento) => {
            if (evento.translationX > 150) {
                x.value = withSpring(800);
                if (alAceptar) runOnJS(alAceptar)(plato);
            } else if (evento.translationX < -150) {
                x.value = withSpring(-800);
                if (alRechazar) runOnJS(alRechazar)(plato);
            } else {
                x.value = withSpring(0);
                y.value = withSpring(0);
            }
        });

    const estiloMovimiento = useAnimatedStyle(() => ({
        transform: [
            { translateX: x.value },
            { translateY: y.value },
            { rotate: `${x.value / 25}deg` }
        ],
    }));

    return (
        <GestureDetector gesture={deslizarGesto}>
            <Animated.View style={[styles.cardWrapper, { cursor: 'pointer' }, estiloMovimiento]}>
                <View style={[styles.card, { maxWidth: 780 }]}>
                    <Image source={{ uri: plato.foto }} style={styles.image} />
                    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.gradient}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.name}>{plato.nombre}</Text>
                            <Text style={styles.restaurant}>{plato.restaurante}</Text>
                        </View>
                    </LinearGradient>
                </View>
            </Animated.View>
        </GestureDetector>
    );
}
