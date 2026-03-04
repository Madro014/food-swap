import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styles } from './Boton.styles';

interface BotonProps extends TouchableOpacityProps {
    titulo: string;
}

export function Boton({ titulo, style, ...props }: BotonProps) {
    return (
        <TouchableOpacity style={[styles.button, style]} activeOpacity={0.8} {...props}>
            <Text style={styles.buttonText}>{titulo}</Text>
        </TouchableOpacity>
    );
}
