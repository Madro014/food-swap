import { Boton } from '@Global/compartido/componentes/atomos/Boton';
import { InputConError } from '@Global/compartido/componentes/atomos/InputConError';
import { IconSymbol } from '@Global/components/ui/icon-symbol';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation } from 'react-native';
import { TEXTOS_AUTH } from '../../constantes/textos';
import { useAuthForm } from '../../useAuthForm';
import { useAuthStore } from '../../useAuthStore';
import { EnlaceNavegacion } from '../moleculas/EnlaceNavegacion';
import { styles } from './FormularioLogin.styles';

interface FormularioLoginProps {
    alHacerSubmit: (email: string, password: string, rol: 'cliente' | 'negocio') => Promise<void>;
    alNavegarRegistro: () => void;
}

export const FormularioLogin = ({ alHacerSubmit, alNavegarRegistro }: FormularioLoginProps) => {
    const { email, setEmail, password, setPassword, errores, limpiarError, validar } = useAuthForm();
    const textos = TEXTOS_AUTH.login;
    const textosRoles = TEXTOS_AUTH.roles;
    const [rolSeleccionado, setRolSeleccionado] = useState<'cliente' | 'negocio'>('cliente');

    const cargando = useAuthStore(state => state.cargando);
    const errorAuth = useAuthStore(state => state.errorAuth);

    const handleRoleChange = (rol: 'cliente' | 'negocio') => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setRolSeleccionado(rol);
    };

    const handleSubmit = async () => {
        if (validar()) {
            await alHacerSubmit(email, password, rolSeleccionado);
        }
    };

    return (
        <View>
            <View style={styles.selectorContenedor}>
                <TouchableOpacity 
                    style={[styles.botonRol, rolSeleccionado === 'cliente' && styles.botonRolActivo]} 
                    onPress={() => handleRoleChange('cliente')}
                >
                    <Text style={[styles.textoRol, rolSeleccionado === 'cliente' && styles.textoRolActivo]}>
                        {textosRoles.cliente}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.botonRol, rolSeleccionado === 'negocio' && styles.botonRolActivo]} 
                    onPress={() => handleRoleChange('negocio')}
                >
                    <Text style={[styles.textoRol, rolSeleccionado === 'negocio' && styles.textoRolActivo]}>
                        {textosRoles.negocio}
                    </Text>
                </TouchableOpacity>
            </View>
            <InputConError
                label={textos.labelEmail}
                placeholder={textos.placeholderEmail}
                value={email}
                onChangeText={(v) => { setEmail(v); limpiarError('email'); }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                error={errores.email}
                leftIcon={<IconSymbol name="envelope.fill" size={18} color="#A8A39F" />}
            />
            <InputConError
                label={textos.labelPassword}
                placeholder={textos.placeholderPassword}
                value={password}
                onChangeText={(v) => { setPassword(v); limpiarError('password'); }}
                secureTextEntry
                error={errores.password}
                leftIcon={<IconSymbol name="lock.fill" size={18} color="#A8A39F" />}
            />
            {errorAuth && (
                <Text style={styles.textoError}>{errorAuth}</Text>
            )}
            <Boton titulo={cargando ? 'Ingresando...' : textos.botonSubmit} onPress={handleSubmit} />
            <EnlaceNavegacion
                textoNormal={textos.textoEnlaceNormal}
                textoResaltado={textos.textoEnlaceBold}
                onPress={alNavegarRegistro}
            />
        </View>
    );
};
