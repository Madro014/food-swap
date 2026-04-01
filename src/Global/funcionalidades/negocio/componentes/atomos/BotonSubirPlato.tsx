import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../dashboard.styles';

interface BotonSubirPlatoProps {
    onPress: () => void;
}

export const BotonSubirPlato = ({ onPress }: BotonSubirPlatoProps) => {
    return (
        <View style={styles.footer}>
            <TouchableOpacity 
                style={styles.botonSubir} 
                onPress={onPress}
            >
                <Text style={styles.textoBotonSubir}>+ Subir un nuevo plato</Text>
            </TouchableOpacity>
        </View>
    );
};
