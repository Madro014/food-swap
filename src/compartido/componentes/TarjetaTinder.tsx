import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnchoPantalla = Dimensions.get('window').width;

// usamos el tipo "any" para que sea mas facil de entender, pero normalmente ponemos los tipos de verdad
export default function TarjetaDeComida({ plato, alAceptar, alRechazar }: any) {
    // estos valores son los que cambian cuando el usuario mueve su dedito en la pantalla
    const x = useSharedValue(0);
    const y = useSharedValue(0);
    const comienzoX = useSharedValue(0);
    const comienzoY = useSharedValue(0);

    // esto agarra el arrastre de deslizar la tarjeta para los lados
    const deslizarGesto = Gesture.Pan()
        .onStart(() => {
            // guardamos la posicion inicial donde pusiste el dedo
            comienzoX.value = x.value;
            comienzoY.value = y.value;
        })
        .onUpdate((evento) => {
            // esto mueve la tarjeta mientras mueves el dedo
            x.value = comienzoX.value + evento.translationX;
            y.value = comienzoY.value + evento.translationY;
        })
        .onEnd((evento) => {
            // si la arrastras muy a la derecha (te gusta) o izquierda (no te gusta)
            if (evento.translationX > 100) {
                x.value = withSpring(AnchoPantalla + 100); // se va volando a la derecha
                // usamos runOnJS porque este codigo se ejecuta muy rapido en el telefono nativo
                // y nuestras funciones "alAceptar" estan en la parte de javascript (react)
                if (alAceptar) runOnJS(alAceptar)(plato);
            } else if (evento.translationX < -100) {
                x.value = withSpring(-AnchoPantalla - 100); // se va volando a la izq
                if (alRechazar) runOnJS(alRechazar)(plato);
            } else {
                // regresa al centro como si tuviera una banda elastica
                x.value = withSpring(0);
                y.value = withSpring(0);
            }
        });

    // esto gira la tarjeta un poquito cuando la mueves, para que se vea genial
    const estiloMovimiento = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: x.value },
                { translateY: y.value },
                { rotate: `${x.value / 20}deg` } // Gira un poquito
            ],
        };
    });

    // estas son las fuentes, usamos Inter extraida de Google Fonts en expo
    // google las hace gratuitas y muy bonitas para los programadores
    return (
        <GestureDetector gesture={deslizarGesto}>
            <Animated.View style={[dibujo.tarjeta, estiloMovimiento]}>
                <Image source={{ uri: plato.foto }} style={dibujo.foto} />
                <View style={dibujo.textoAca}>
                    <Text style={dibujo.nombreLetra}>{plato.nombre}</Text>
                    <Text style={dibujo.descripcionLetra}>{plato.restaurante} - A {plato.distancia} km</Text>
                </View>
            </Animated.View>
        </GestureDetector>
    );
}

const dibujo = StyleSheet.create({
    tarjeta: {
        height: 500,
        width: 300,
        backgroundColor: 'white',
        borderRadius: 20, // esquina redondita
        borderWidth: 2,
        borderColor: '#e5e5e5',
        overflow: 'hidden',
        position: 'absolute', // Una sobre la otra
    },
    foto: {
        width: '100%',
        height: 350,
    },
    textoAca: {
        padding: 15,
    },
    nombreLetra: {
        fontSize: 24,
        fontWeight: 'bold', // letras mas rellenitas
        fontFamily: 'Inter_700Bold', // fuente de google
    },
    descripcionLetra: {
        fontSize: 16,
        color: 'gray',
        fontFamily: 'Inter_400Regular', // fuente normal de google
    }
});
