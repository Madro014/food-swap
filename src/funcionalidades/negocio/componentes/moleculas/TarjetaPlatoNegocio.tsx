import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../../dashboard.styles';

interface TarjetaPlatoNegocioProps {
    nombreRestaurante: string;
    nombrePlato: string;
    imagenUri: string | null;
}

export const TarjetaPlatoNegocio = ({ nombreRestaurante, nombrePlato, imagenUri }: TarjetaPlatoNegocioProps) => {
    return (
        <View style={styles.tarjetaPlato}>
            <Image 
                source={{ uri: imagenUri || 'https://via.placeholder.com/300' }} 
                style={styles.imagenPlato} 
            />
            <View style={styles.infoPlato}>
                <Text style={styles.tituloPlato}>{nombrePlato}</Text>
                <Text style={styles.textoRestaurante}>{nombreRestaurante}</Text>
            </View>
        </View>
    );
};
