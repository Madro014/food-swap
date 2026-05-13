import React from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from './LogoApp.styles';

interface LogoAppProps {
    subtitulo: string;
}

import logoPremium from '../../../../../assets/images/logo_premium.png';

export function LogoApp({ subtitulo }: LogoAppProps) {
    return (
        <View style={styles.container}>
            <Image
                source={logoPremium}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.subtitulo}>{subtitulo}</Text>
        </View>
    );
}
