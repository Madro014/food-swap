import { TransicionComida, TransicionComidaRef } from '@Global/compartido/componentes/TransicionComida';
import animacionConfig from '@Global/compartido/config/animacion.json';
import { StatusBar } from 'expo-status-bar';
import React, { forwardRef } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, Easing, FadeIn, useSharedValue } from 'react-native-reanimated';
import { styles } from '@Global/funcionalidades/auth/auth.styles';

interface PlantillaAuthProps {
    subtituloLogo: string;
    children: React.ReactNode;
    esRegistro?: boolean;
}


export const PlantillaAuthWeb = forwardRef<TransicionComidaRef, PlantillaAuthProps>(
    ({ children, esRegistro = false }, ref) => {
        const { width } = useWindowDimensions();
        const isMobile = width < 800;
        const transitionValue = useSharedValue(esRegistro ? 0 : 1);

        React.useEffect(() => {
            transitionValue.value = withTiming(esRegistro ? 1 : 0, {
                duration: 700,
                easing: Easing.bezier(0.4, 0, 0.2, 1),
            });
        }, [esRegistro, transitionValue]);

        const brandAnimatedStyle = useAnimatedStyle(() => {
            if (isMobile) return styles.webBrandSideMobile;
            return {
                left: `${transitionValue.value * 50}%`,
                width: '50%',
                position: 'absolute',
                top: 0,
                bottom: 0
            };
        });

        const contentAnimatedStyle = useAnimatedStyle(() => {
            if (isMobile) return styles.contentWebMobile;
            return {
                left: `${(1 - transitionValue.value) * 50}%`,
                width: '50%',
                position: 'absolute',
                top: 0,
                bottom: 0
            };
        });

        const bgImageUrl = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop';

        return (
            <View style={[styles.container, styles.containerWeb]}>
                <StatusBar hidden={true} />
                <View style={{ flex: 1 }}>
                    <Animated.View style={[styles.webBrandSide, brandAnimatedStyle]}>
                        <Image 
                            source={{ uri: bgImageUrl }} 
                            style={StyleSheet.absoluteFill} 
                            resizeMode="cover"
                        />
                        <View style={isMobile ? [styles.webBrandOverlay, styles.webBrandOverlayMobile] : styles.webBrandOverlay} />
                        <View style={isMobile ? [styles.webBrandTextContainer, styles.webBrandTextContainerMobile] : styles.webBrandTextContainer}>
                            <Image
                                source={{ uri: 'https://res.cloudinary.com/dzdgdqoap/image/upload/v1772550710/foodmatch_osnrsz.png' }}
                                style={isMobile ? [styles.webLogo, styles.webLogoMobile] : styles.webLogo}
                                resizeMode="contain"
                            />
                            <Text style={isMobile ? [styles.webHeadline, styles.webHeadlineMobile] : styles.webHeadline}>Comparte & Disfruta</Text>
                            {!isMobile && (
                                <Text style={styles.webSubHeadline}>
                                    Descubre platos artesanales y comparte tu arte culinario con la comunidad.
                                </Text>
                            )}
                        </View>
                    </Animated.View>

                    <Animated.View style={[styles.content, styles.contentWeb, contentAnimatedStyle]}>
                        <ScrollView 
                            style={{ width: '100%' }}
                            contentContainerStyle={[
                                { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
                                isMobile ? { paddingVertical: 40 } : null
                            ]}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={isMobile}
                        >
                            <Animated.View 
                                entering={FadeIn.duration(500).delay(200)}
                                style={isMobile ? [styles.formContainer, styles.formContainerWeb, styles.formContainerWebMobile] : [styles.formContainer, styles.formContainerWeb]}
                            >
                                <View style={isMobile ? [styles.formHeader, styles.formHeaderMobile] : styles.formHeader}>
                                    <Text style={isMobile ? [styles.formTitle, styles.formTitleMobile] : styles.formTitle}>
                                        {esRegistro ? 'Regístrate' : 'Bienvenido'}
                                    </Text>
                                    <Text style={isMobile ? [styles.formSubtitle, styles.formSubtitleMobile] : styles.formSubtitle}>
                                        {esRegistro ? 'Crea una cuenta para comenzar' : 'Ingresa a tu cuenta para continuar'}
                                    </Text>
                                </View>
                                {children}
                            </Animated.View>
                        </ScrollView>
                    </Animated.View>
                </View>
                <TransicionComida ref={ref} imageUrl={animacionConfig.transicion.imagenUrl} color="#FF6B35" />
            </View>
        );
    }
);

PlantillaAuthWeb.displayName = 'PlantillaAuthWeb';