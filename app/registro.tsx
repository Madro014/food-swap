import React from 'react';
import { View } from 'react-native';
import { RegistroVista } from '@Global/funcionalidades/auth/RegistroVista';
import { styles } from '@Global/funcionalidades/auth/registro.styles';

export default function RegistroScreen() {
    return (
        <View style={styles.container}>
            <RegistroVista />
        </View>
    );
}
