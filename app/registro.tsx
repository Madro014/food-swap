import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RegistroVista } from '../src/funcionalidades/auth/RegistroVista';

export default function RegistroScreen() {
    return (
        <View style={styles.container}>
            <RegistroVista />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
