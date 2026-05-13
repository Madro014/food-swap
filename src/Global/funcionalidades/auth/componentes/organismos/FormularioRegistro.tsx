import { Boton } from '@Global/compartido/componentes/atomos/Boton';
import { InputConError } from '@Global/compartido/componentes/atomos/InputConError';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { TEXTOS_AUTH } from '../../constantes/textos';
import { useAuthForm } from '../../useAuthForm';
import { useAuthStore } from '../../useAuthStore';
import { EnlaceNavegacion } from '../moleculas/EnlaceNavegacion';
import { styles } from './FormularioRegistro.styles';

interface FormularioRegistroProps {
    alHacerSubmit: (
        data: { nombre: string; telefono: string; direccion: string; logo: string; email: string; password: string },
        rol: 'cliente' | 'negocio',
    ) => Promise<void>;
    alNavegarLogin: () => void;
}

export const FormularioRegistro = ({ alHacerSubmit, alNavegarLogin }: FormularioRegistroProps) => {
    const { 
        nombre, setNombre, 
        telefono, setTelefono,
        direccion, setDireccion,
        logo, setLogo,
        email, setEmail, 
        password, setPassword, 
        errores, limpiarError, validar 
    } = useAuthForm(true);
    const textos = TEXTOS_AUTH.registro;
    const textosRoles = TEXTOS_AUTH.roles;
    const [rolSeleccionado, setRolSeleccionado] = useState<'cliente' | 'negocio'>('cliente');

    const cargando = useAuthStore(state => state.cargando);
    const errorAuth = useAuthStore(state => state.errorAuth);

    const handleSubmit = async () => {
        if (validar(rolSeleccionado)) {
            await alHacerSubmit({ nombre, telefono, direccion, logo, email, password }, rolSeleccionado);
        }
    };

    const seleccionarLogo = async () => {
        // Pedir permiso localmente o abrir directo
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Equivalente a accept="image/*"
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setLogo(result.assets[0].uri);
            limpiarError('logo' as any); // Por si queremos limpiarlo luego
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
                label={rolSeleccionado === 'negocio' ? textos.labelNombreEmpresa : textos.labelNombre}
                placeholder={rolSeleccionado === 'negocio' ? textos.placeholderNombreEmpresa : textos.placeholderNombre}
                value={nombre}
                onChangeText={(v) => { setNombre(v); limpiarError('nombre'); }}
                error={errores.nombre}
            />
            
            {rolSeleccionado === 'negocio' && (
                <>
                    <InputConError
                        label={textos.labelTelefono}
                        placeholder={textos.placeholderTelefono}
                        value={telefono}
                        onChangeText={(v) => { setTelefono(v); limpiarError('telefono'); }}
                        keyboardType="phone-pad"
                        error={errores.telefono}
                    />
                    <InputConError
                        label={textos.labelDireccion}
                        placeholder={textos.placeholderDireccion}
                        value={direccion}
                        onChangeText={(v) => { setDireccion(v); limpiarError('direccion'); }}
                        error={errores.direccion}
                    />
                    
                    {/* Selector de Logo Nativo */}
                    <Text style={styles.labelLogo}>{textos.labelLogo}</Text>
                    
                    {logo ? (
                        <View style={styles.previewContainer}>
                            <Image 
                                source={{ uri: logo }} 
                                style={styles.previewImage} 
                                resizeMode="cover"
                            />
                            <TouchableOpacity style={styles.botonCambiarLogo} onPress={seleccionarLogo}>
                                <Text style={styles.textoBotonCambiarLogo}>Cambiar Logo</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.botonLogo} onPress={seleccionarLogo}>
                            <Text style={styles.textoBotonLogo}>
                                {textos.botonSubeLogo || "Seleccionar Logo"}
                            </Text>
                        </TouchableOpacity>
                    )}
                </>
            )}
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
            {errorAuth && (
                <Text style={styles.textoError}>{errorAuth}</Text>
            )}
            <Boton titulo={cargando ? 'Registrando...' : textos.botonSubmit} onPress={handleSubmit} />
            <EnlaceNavegacion
                textoNormal={textos.textoEnlaceNormal}
                textoResaltado={textos.textoEnlaceBold}
                onPress={alNavegarLogin}
            />
        </View>
    );
};
