import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../dashboard.styles';
import { IconSymbol } from '@Global/components/ui/icon-symbol';

interface BotonSubirPlatoProps {
    onPress: () => void;
}

export const BotonSubirPlato = ({ onPress }: BotonSubirPlatoProps) => {
    return (
        <View style={styles.footerContainer}>
            <TouchableOpacity 
                style={styles.botonSubir} 
                onPress={onPress}
                activeOpacity={0.9}
            >
                <IconSymbol name="plus" size={20} color="#FFFFFF" />
                <Text style={styles.textoBotonSubir}>Publicar nuevo plato</Text>
            </TouchableOpacity>
        </View>
    );
};
