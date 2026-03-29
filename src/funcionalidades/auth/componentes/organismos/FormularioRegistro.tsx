import { Boton } from '@/src/compartido/componentes/atomos/Boton';
import { InputConError } from '@/src/compartido/componentes/atomos/InputConError';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TEXTOS_AUTH } from '../../constantes/textos';
import { useAuthForm } from '../../useAuthForm';
import { EnlaceNavegacion } from '../moleculas/EnlaceNavegacion';

interface FormularioRegistroProps {
    alHacerSubmit: (nombreCompleto: string, rol: 'cliente' | 'negocio') => void;
    alNavegarLogin: () => void;
}

export const FormularioRegistro = ({ alHacerSubmit, alNavegarLogin }: FormularioRegistroProps) => {
    const { nombre, setNombre, email, setEmail, password, setPassword, errores, limpiarError, validar } = useAuthForm(true);
    const textos = TEXTOS_AUTH.registro;
    const textosRoles = TEXTOS_AUTH.roles;
    const [rolSeleccionado, setRolSeleccionado] = useState<'cliente' | 'negocio'>('cliente');

    const handleSubmit = () => {
        if (validar()) {
            alHacerSubmit(nombre, rolSeleccionado);
        }
    };

    return (
        <View>
            <View style={styles.selectorContenedor}>
                <TouchableOpacity 
                    style={[styles.botonRol, rolSeleccionado === 'cliente' && styles.botonRolActivo]} 
                    onPress={() => setRolSeleccionado('cliente')}
                >
                    <Text style={[styles.textoRol, rolSeleccionado === 'cliente' && styles.textoRolActivo]}>
                        {textosRoles.cliente}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.botonRol, rolSeleccionado === 'negocio' && styles.botonRolActivo]} 
                    onPress={() => setRolSeleccionado('negocio')}
                >
                    <Text style={[styles.textoRol, rolSeleccionado === 'negocio' && styles.textoRolActivo]}>
                        {textosRoles.negocio}
                    </Text>
                </TouchableOpacity>
            </View>
            <InputConError
                label={textos.labelNombre}
                placeholder={textos.placeholderNombre}
                value={nombre}
                onChangeText={(v) => { setNombre(v); limpiarError('nombre'); }}
                error={errores.nombre}
            />
            <InputConError
                label={textos.labelEmail}
                placeholder={textos.placeholderEmail}
                value={email}
                onChangeText={(v) => { setEmail(v); limpiarError('email'); }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                error={errores.email}
            />
            <InputConError
                label={textos.labelPassword}
                placeholder={textos.placeholderPassword}
                value={password}
                onChangeText={(v) => { setPassword(v); limpiarError('password'); }}
                secureTextEntry
                error={errores.password}
            />
            <Boton titulo={textos.botonSubmit} onPress={handleSubmit} />
            <EnlaceNavegacion
                textoNormal={textos.textoEnlaceNormal}
                textoResaltado={textos.textoEnlaceBold}
                onPress={alNavegarLogin}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    selectorContenedor: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#f1f5f9',
        borderRadius: 8,
        padding: 4,
    },
    botonRol: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 6,
    },
    botonRolActivo: {
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    textoRol: {
        fontSize: 14,
        fontWeight: '500',
        color: '#64748b',
    },
    textoRolActivo: {
        color: '#0f172a',
        fontWeight: 'bold',
    }
});
