import React from 'react';
import { View, Text } from 'react-native';
import { TEXTOS_AUTH } from '@Global/funcionalidades/auth/constantes/textos';
import { InputConError } from '@Global/compartido/componentes/atomos/InputConError';
import { styles } from '../../wizard.styles';

interface PasoRestauranteProps {
    nombreRestaurante: string;
    setNombreRestaurante: (nombre: string) => void;
}

export const PasoRestaurante = ({ nombreRestaurante, setNombreRestaurante }: PasoRestauranteProps) => {
    const textos = TEXTOS_AUTH.wizardNegocio;
    
    return (
        <View>
            <Text style={styles.titulo}>{textos.paso1Titulo}</Text>
            <InputConError
                label={textos.paso1Label}
                placeholder={textos.paso1Placeholder}
                value={nombreRestaurante}
                onChangeText={setNombreRestaurante}
            />
        </View>
    );
};
