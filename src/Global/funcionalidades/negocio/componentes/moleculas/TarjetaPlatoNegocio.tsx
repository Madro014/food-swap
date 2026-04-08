import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../../dashboard.styles';
import { IconSymbol } from '@Global/components/ui/icon-symbol';

interface TarjetaPlatoNegocioProps {
    id: string;
    nombreRestaurante: string;
    nombrePlato: string;
    imagenUri: string | null;
    onEliminar?: (id: string) => void;
}

export const TarjetaPlatoNegocio = ({ id, nombreRestaurante, nombrePlato, imagenUri, onEliminar }: TarjetaPlatoNegocioProps) => {
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

            {onEliminar && (
                <TouchableOpacity 
                    style={styles.botonEliminar} 
                    onPress={() => onEliminar(id)}
                    activeOpacity={0.7}
                >
                    <IconSymbol name="xmark" size={20} color="#FF3B30" />
                </TouchableOpacity>
            )}
        </View>
    );
};
