import { Boton } from '@Global/compartido/componentes/atomos/Boton';
import { InputConError } from '@Global/compartido/componentes/atomos/InputConError';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { TEXTOS_AUTH } from '../../constantes/textos';
import { useAuthForm } from '../../useAuthForm';
import { EnlaceNavegacion } from '../moleculas/EnlaceNavegacion';

interface FormularioRegistroProps {
    alHacerSubmit: (data: {nombre: string, telefono: string, direccion: string, logo: string, email: string}, rol: 'cliente' | 'negocio') => void;
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

    const handleSubmit = () => {
        if (validar(rolSeleccionado)) {
            alHacerSubmit({nombre, telefono, direccion, logo, email}, rolSeleccionado);
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
        backgroundColor: '#f0e6e1',
        borderRadius: 9999,
        padding: 4,
    },
    botonRol: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 9999,
    },
    botonRolActivo: {
        backgroundColor: '#ffffff',
        shadowColor: '#322e2b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    textoRol: {
        fontSize: 14,
        fontWeight: '500',
        color: '#605a57',
    },
    textoRolActivo: {
        color: '#322e2b',
        fontWeight: 'bold',
    },
    labelLogo: {
        fontSize: 14,
        fontWeight: '600',
        color: '#322e2b',
        marginBottom: 8,
        marginTop: 4,
    },
    botonLogo: {
        backgroundColor: '#f0e6e1',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#d2c9c4',
        borderStyle: 'dashed',
    },
    textoBotonLogo: {
        color: '#605a57',
        fontWeight: '500',
    },
    textoRutaLogo: {
        fontSize: 12,
        color: '#7b726d',
        marginBottom: 16,
        fontStyle: 'italic',
    },
    previewContainer: {
        alignItems: 'center',
        marginBottom: 16,
        gap: 8,
    },
    previewImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#f0e6e1',
    },
    botonCambiarLogo: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: '#fef5f0',
        borderWidth: 1,
        borderColor: '#FFE5D9',
    },
    textoBotonCambiarLogo: {
        fontSize: 12,
        color: '#FF6B35',
        fontWeight: 'bold',
    }
});
