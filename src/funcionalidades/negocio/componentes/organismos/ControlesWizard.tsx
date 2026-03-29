import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TEXTOS_AUTH } from '@/src/funcionalidades/auth/constantes/textos';
import { styles } from '../../wizard.styles';

interface ControlesWizardProps {
    pasoActual: number;
    totalPasos: number;
    irAtras: () => void;
    irSiguiente: () => void;
    finalizarWizard: () => void;
    siguienteDeshabilitado: boolean;
    finalizarDeshabilitado: boolean;
}

export const ControlesWizard = ({
    pasoActual,
    totalPasos,
    irAtras,
    irSiguiente,
    finalizarWizard,
    siguienteDeshabilitado,
    finalizarDeshabilitado
}: ControlesWizardProps) => {
    const textos = TEXTOS_AUTH.wizardNegocio;

    return (
        <View style={styles.footer}>
            {pasoActual > 1 && (
                <TouchableOpacity style={[styles.botonControl, styles.botonAtras]} onPress={irAtras}>
                    <Text style={styles.textoBotonAtras}>{textos.botonAtras}</Text>
                </TouchableOpacity>
            )}
            
            {pasoActual < totalPasos ? (
                <TouchableOpacity 
                    style={[styles.botonControl, styles.botonSiguiente, siguienteDeshabilitado ? styles.botonDeshabilitado : null]} 
                    onPress={irSiguiente}
                    disabled={siguienteDeshabilitado}
                >
                    <Text style={styles.textoBotonSiguiente}>{textos.botonSiguiente}</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity 
                    style={[styles.botonControl, styles.botonSiguiente, finalizarDeshabilitado ? styles.botonDeshabilitado : null]} 
                    onPress={finalizarWizard}
                    disabled={finalizarDeshabilitado}
                >
                    <Text style={styles.textoBotonSiguiente}>{textos.botonFinalizar}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};
