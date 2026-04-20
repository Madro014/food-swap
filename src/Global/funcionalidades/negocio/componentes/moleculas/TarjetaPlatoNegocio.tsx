<<<<<<< HEAD
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
=======
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
>>>>>>> origin/main
import { styles } from '../../dashboard.styles';
import { IconSymbol } from '@Global/components/ui/icon-symbol';

interface TarjetaPlatoNegocioProps {
    id: string;
    nombreRestaurante: string;
    nombrePlato: string;
    imagenUri: string | null;
    onEliminar?: (id: string) => void;
<<<<<<< HEAD
    onEdit?: (id: string) => void;
}

export const TarjetaPlatoNegocio = ({ id, nombreRestaurante, nombrePlato, imagenUri, onEliminar, onEdit }: TarjetaPlatoNegocioProps) => {
    const [isHovered, setIsHovered] = useState(false);

=======
}

export const TarjetaPlatoNegocio = ({ id, nombreRestaurante, nombrePlato, imagenUri, onEliminar }: TarjetaPlatoNegocioProps) => {
>>>>>>> origin/main
    return (
        <Pressable 
            style={({ pressed }) => [
                styles.tarjetaPlato,
                pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }
            ]}
            onPress={() => onEdit && onEdit(id)}
            onHoverIn={() => setIsHovered(true)}
            onHoverOut={() => setIsHovered(false)}
        >
            <View>
                <Image 
                    source={{ uri: imagenUri || 'https://via.placeholder.com/600' }} 
                    style={styles.imagenPlato} 
                    resizeMode="cover"
                />
                <View style={styles.overlayImagen} />
                
                {isHovered && (
                    <View style={styles.overlayEdit}>
                        <IconSymbol name="pencil" size={24} color="#FFFFFF" />
                        <Text style={styles.textoEditOverlay}>Editar Plato</Text>
                    </View>
                )}
            </View>

<<<<<<< HEAD
            <View style={styles.infoPlato}>
                <Text style={styles.etiquetaEmpresa} numberOfLines={1}>{nombreRestaurante}</Text>
                <Text style={styles.tituloPlato} numberOfLines={1}>{nombrePlato}</Text>
                <Text style={styles.textoRestaurante} numberOfLines={1}>{nombreRestaurante}</Text>
            </View>

            {onEliminar && (
                <TouchableOpacity 
                    style={styles.botonEliminar} 
                    onPress={(e) => {
                        e.stopPropagation(); // Prevent card press when deleting
                        onEliminar(id);
                    }}
                    activeOpacity={0.8}
                >
                    <IconSymbol name="xmark" size={18} color="#E63946" />
                </TouchableOpacity>
            )}
        </Pressable>
=======
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
>>>>>>> origin/main
    );
};
