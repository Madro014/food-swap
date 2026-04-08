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
    deshabilitada?: boolean;
}

export function TarjetaTinderWeb({ plato, alAceptar, alRechazar, deshabilitada }: TarjetaDeComidaProps) {
    const x = useSharedValue(0);
    const y = useSharedValue(0);

    const deslizarGesto = Gesture.Pan()
        .enabled(!deshabilitada)
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
            <Animated.View style={[styles.container, { cursor: 'pointer' }, estiloMovimiento]}>
                <Image source={{ uri: plato.foto }} style={styles.image} />
           

                <View style={styles.priceTag}>
                    <Text style={styles.priceText}>${plato.precio}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.restaurant}>{plato.restaurante}</Text>
                    <Text style={styles.nombre}>{plato.nombre}</Text>
                    
                    <Text style={[styles.descripcion, { marginBottom: 16 }]} numberOfLines={3}>
                        {plato.descripcion}
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, marginRight: 8 }}>📍</Text>
                        <Text style={styles.descripcion}>A {plato.distancia || 0.1} km de ti</Text>
                    </View>
                </View>
            </Animated.View>
        </GestureDetector>
    );
}
