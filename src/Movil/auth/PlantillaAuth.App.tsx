import { FondoAnimadoComida } from '@Global/compartido/componentes/FondoAnimadoComida';
import { TransicionComida, TransicionComidaRef } from '@Global/compartido/componentes/TransicionComida';
import { LogoApp } from '@Global/compartido/componentes/moleculas/LogoApp';
import animacionConfig from '@Global/compartido/config/animacion.json';
import { StatusBar } from 'expo-status-bar';
import React, { forwardRef } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@Global/funcionalidades/auth/auth.styles';

interface PlantillaAuthProps {
    subtituloLogo: string;
    children: React.ReactNode;
    esRegistro?: boolean;
}

export const PlantillaAuthApp = forwardRef<TransicionComidaRef, PlantillaAuthProps>(
    ({ subtituloLogo, children }, ref) => {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fef5f0' }}>
                <StatusBar hidden={true} />
                <FondoAnimadoComida />
                
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.content}>
                        <View style={styles.contentInnerMobile}>
                            <LogoApp subtitulo={subtituloLogo} />
                        </View>
                        <View style={styles.formContainer}>
                            {children}
                        </View>
                    </View>
                </ScrollView>

                <TransicionComida ref={ref} imageUrl={animacionConfig.transicion.imagenUrl} color="#FF6B35" />
            </SafeAreaView>
        );
    }
);

PlantillaAuthApp.displayName = 'PlantillaAuthApp';
