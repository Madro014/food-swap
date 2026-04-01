import { FondoAnimadoComida } from '@Global/compartido/componentes/FondoAnimadoComida';
import { TransicionComida, TransicionComidaRef } from '@Global/compartido/componentes/TransicionComida';
import { LogoApp } from '@Global/compartido/componentes/moleculas/LogoApp';
import animacionConfig from '@Global/compartido/config/animacion.json';
import { StatusBar } from 'expo-status-bar';
import React, { forwardRef } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { styles } from '@Global/funcionalidades/auth/auth.styles';

interface PlantillaAuthProps {
    subtituloLogo: string;
    children: React.ReactNode;
    esRegistro?: boolean;
}

export const PlantillaAuthApp = forwardRef<TransicionComidaRef, PlantillaAuthProps>(
    ({ subtituloLogo, children }, ref) => {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <StatusBar hidden={true} />
                <FondoAnimadoComida />

                <View style={{ flex: 1 }}>
                    <Animated.View style={styles.content}>
                        <View style={styles.contentInnerMobile}>
                            <LogoApp subtitulo={subtituloLogo} />
                        </View>
                        <Animated.View style={styles.formContainer}>
                            {children}
                        </Animated.View>
                    </Animated.View>
                </View>
                <TransicionComida ref={ref} imageUrl={animacionConfig.transicion.imagenUrl} color="#FF6B35" />
            </KeyboardAvoidingView>
        );
    }
);

PlantillaAuthApp.displayName = 'PlantillaAuthApp';
