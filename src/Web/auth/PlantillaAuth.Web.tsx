import { FondoAnimadoComida } from '@Global/compartido/componentes/FondoAnimadoComida';
import { TransicionComida, TransicionComidaRef } from '@Global/compartido/componentes/TransicionComida';
import animacionConfig from '@Global/compartido/config/animacion.json';
import { StatusBar } from 'expo-status-bar';
import React, { forwardRef } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, Easing, FadeIn, useSharedValue } from 'react-native-reanimated';
import { styles } from '@Global/funcionalidades/auth/auth.styles';

interface PlantillaAuthProps {
    subtituloLogo: string;
    children: React.ReactNode;
    esRegistro?: boolean;
}

import logoPremium from '../../../assets/images/logo_premium.png';

export const PlantillaAuthWeb = forwardRef<TransicionComidaRef, PlantillaAuthProps>(
    ({ children, esRegistro = false }, ref) => {
        const transitionValue = useSharedValue(esRegistro ? 0 : 1);

        React.useEffect(() => {
            transitionValue.value = withTiming(esRegistro ? 1 : 0, {
                duration: 700,
                easing: Easing.bezier(0.4, 0, 0.2, 1),
            });
        }, [esRegistro, transitionValue]);

        const brandAnimatedStyle = useAnimatedStyle(() => ({
            left: `${transitionValue.value * 50}%`,
            width: '50%',
            position: 'absolute',
            top: 0,
            bottom: 0
        }));

        const contentAnimatedStyle = useAnimatedStyle(() => ({
            left: `${(1 - transitionValue.value) * 50}%`,
            width: '50%',
            position: 'absolute',
            top: 0,
            bottom: 0
        }));

        const bgImageUrl = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop';

        return (
            <View style={[styles.container, styles.containerWeb]}>
                <StatusBar hidden={true} />
                <View style={{ flex: 1 }}>
                    <Animated.View style={[styles.webBrandSide, brandAnimatedStyle]}>
                        <Image 
                            source={{ uri: bgImageUrl }} 
                            style={[StyleSheet.absoluteFill, { opacity: 0.6 }]} 
                            resizeMode="cover"
                        />
                        <View style={styles.webBrandOverlay} />
                        <View style={styles.webBrandTextContainer}>
                            <Image
                                source={logoPremium}
                                style={styles.webLogo}
                                resizeMode="contain"
                            />
                            <Text style={styles.webHeadline}>Comparte & Disfruta</Text>
                            <Text style={styles.webSubHeadline}>
                                Descubre platos artesanales y comparte tu arte culinario con la comunidad.
                            </Text>
                        </View>
                    </Animated.View>

                    <Animated.View style={[styles.content, styles.contentWeb, contentAnimatedStyle]}>
                        <Animated.View 
                            entering={FadeIn.duration(500).delay(200)}
                            style={[styles.formContainer, styles.formContainerWeb]}
                        >
                            <View style={{ marginBottom: 30, alignItems: 'center' }}>
                                <Text style={{ fontSize: 28, fontFamily: 'Inter_700Bold', color: '#110e0b', marginBottom: 8 }}>
                                    {esRegistro ? 'Regístrate' : 'Bienvenido'}
                                </Text>
                                <Text style={{ fontSize: 16, fontFamily: 'Inter_400Regular', color: '#605a57' }}>
                                    {esRegistro ? 'Crea una cuenta para comenzar' : 'Ingresa a tu cuenta para continuar'}
                                </Text>
                            </View>
                            {children}
                        </Animated.View>
                    </Animated.View>
                </View>
                <TransicionComida ref={ref} imageUrl={animacionConfig.transicion.imagenUrl} color="#FF6B35" />
            </View>
        );
    }
);

PlantillaAuthWeb.displayName = 'PlantillaAuthWeb';
