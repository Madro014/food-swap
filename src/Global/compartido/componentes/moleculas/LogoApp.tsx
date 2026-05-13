import React from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from './LogoApp.styles';

interface LogoAppProps {
    subtitulo: string;
}

export function LogoApp({ subtitulo }: LogoAppProps) {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://res.cloudinary.com/dzdgdqoap/image/upload/v1772550710/foodmatch_osnrsz.png' }}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.subtitulo}>{subtitulo}</Text>
        </View>
    );
}