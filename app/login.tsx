import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LoginVista } from '@Global/funcionalidades/auth/LoginVista';

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <LoginVista />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
