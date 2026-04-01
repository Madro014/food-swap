import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../../auth.styles';

interface EnlaceNavegacionProps {
    textoNormal: string;
    textoResaltado: string;
    onPress: () => void;
}

export const EnlaceNavegacion = ({ textoNormal, textoResaltado, onPress }: EnlaceNavegacionProps) => {
    return (
        <TouchableOpacity style={styles.linkContainer} onPress={onPress}>
            <Text style={styles.linkText}>
                {textoNormal} <Text style={styles.linkTextBold}>{textoResaltado}</Text>
            </Text>
        </TouchableOpacity>
    );
};
