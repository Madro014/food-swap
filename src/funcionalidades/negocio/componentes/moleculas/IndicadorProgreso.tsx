import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../wizard.styles';

interface IndicadorProgresoProps {
    pasoActual: number;
    totalPasos: number;
}

export const IndicadorProgreso = ({ pasoActual, totalPasos }: IndicadorProgresoProps) => {
    return (
        <View style={styles.header}>
            <Text style={styles.textoPaso}>Paso {pasoActual} de {totalPasos}</Text>
            <View style={styles.barraProgreso}>
                <View style={[styles.progresoActivo, { width: `${(pasoActual / totalPasos) * 100}%` }]} />
            </View>
        </View>
    );
};
