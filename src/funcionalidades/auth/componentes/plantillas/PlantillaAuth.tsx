import { FondoAnimadoComida } from '@/src/compartido/componentes/FondoAnimadoComida';
import { TransicionComida, TransicionComidaRef } from '@/src/compartido/componentes/TransicionComida';
import { LogoApp } from '@/src/compartido/componentes/moleculas/LogoApp';
import animacionConfig from '@/src/compartido/config/animacion.json';
import { StatusBar } from 'expo-status-bar';
import React, { forwardRef } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { styles } from '../../auth.styles';

interface PlantillaAuthProps {
    subtituloLogo: string;
    children: React.ReactNode;
}

export const PlantillaAuth = forwardRef<TransicionComidaRef, PlantillaAuthProps>(
    ({ subtituloLogo, children }, ref) => {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <StatusBar style="dark" />
                <FondoAnimadoComida />
                <View style={styles.content}>
                    <LogoApp subtitulo={subtituloLogo} />
                    <View style={styles.formContainer}>
                        {children}
                    </View>
                </View>
                <TransicionComida ref={ref} imageUrl={animacionConfig.transicion.imagenUrl} color="#ff4b4b" />
            </KeyboardAvoidingView>
        );
    }
);

PlantillaAuth.displayName = 'PlantillaAuth';
