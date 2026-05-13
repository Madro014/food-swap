import React from 'react';
import { View } from 'react-native';
import { LoginVista } from '@Global/funcionalidades/auth/LoginVista';
import { styles } from '@Global/funcionalidades/auth/login.styles';

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <LoginVista />
        </View>
    );
}
