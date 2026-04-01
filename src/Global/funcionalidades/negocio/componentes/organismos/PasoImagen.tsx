import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { TEXTOS_AUTH } from '@Global/funcionalidades/auth/constantes/textos';
import { styles } from '../../wizard.styles';

interface PasoImagenProps {
    imagenUri: string | null;
    seleccionarImagen: () => void;
}

export const PasoImagen = ({ imagenUri, seleccionarImagen }: PasoImagenProps) => {
    const textos = TEXTOS_AUTH.wizardNegocio;
    
    return (
        <View>
            <Text style={styles.titulo}>{textos.paso3Titulo}</Text>
            <TouchableOpacity style={styles.botonImagen} onPress={seleccionarImagen}>
                {imagenUri ? (
                    <Image source={{ uri: imagenUri }} style={styles.imagenPreview} />
                ) : (
                    <View style={styles.placeholderImagen}>
                        <Text style={styles.textoPlaceholderImagen}>+ {textos.paso3Boton}</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};