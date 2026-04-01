import React from 'react';
import { View, Text } from 'react-native';
import { TEXTOS_AUTH } from '@Global/funcionalidades/auth/constantes/textos';
import { InputConError } from '@Global/compartido/componentes/atomos/InputConError';
import { styles } from '../../wizard.styles';

interface PasoPlatoProps {
    nombrePlato: string;
    setNombrePlato: (nombre: string) => void;
}

export const PasoPlato = ({ nombrePlato, setNombrePlato }: PasoPlatoProps) => {
    const textos = TEXTOS_AUTH.wizardNegocio;
    
    return (
        <View>
            <Text style={styles.titulo}>{textos.paso2Titulo}</Text>
            <InputConError
                label={textos.paso2Label}
                placeholder={textos.paso2Placeholder}
                value={nombrePlato}
                onChangeText={setNombrePlato}
            />
        </View>
    );
};
