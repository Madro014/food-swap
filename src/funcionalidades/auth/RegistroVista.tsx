import { FondoAnimadoComida } from '@/src/compartido/componentes/FondoAnimadoComida';
import { TransicionComida, TransicionComidaRef } from '@/src/compartido/componentes/TransicionComida';
import { Boton } from '@/src/compartido/componentes/atomos/Boton';
import { InputConError } from '@/src/compartido/componentes/atomos/InputConError';
import { LogoApp } from '@/src/compartido/componentes/moleculas/LogoApp';
import animacionConfig from '@/src/compartido/config/animacion.json';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './auth.styles';
import { useAuthForm } from './useAuthForm';
import { useAuthStore } from './useAuthStore';

export const RegistroVista = () => {
    const { nombre, setNombre, email, setEmail, password, setPassword, errores, limpiarError, validar } = useAuthForm(true);
    const router = useRouter();
    const loginAction = useAuthStore(state => state.login);
    const transicionRef = useRef<TransicionComidaRef>(null);

    const handleRegister = () => {
        if (!validar()) return;
        loginAction(nombre.trim());
        if (transicionRef.current) {
            transicionRef.current.iniciar(() => router.replace('/(tabs)'));
        } else {
            router.replace('/(tabs)');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <StatusBar style="dark" />
            <FondoAnimadoComida />
            <View style={styles.content}>
                <LogoApp subtitulo="Crea una cuenta para empezar" />
                <View style={styles.formContainer}>
                    <InputConError
                        label="Nombre Completo"
                        placeholder="Juan Pérez"
                        value={nombre}
                        onChangeText={(v) => { setNombre(v); limpiarError('nombre'); }}
                        error={errores.nombre}
                    />
                    <InputConError
                        label="Correo Electrónico"
                        placeholder="tu@correo.com"
                        value={email}
                        onChangeText={(v) => { setEmail(v); limpiarError('email'); }}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        error={errores.email}
                    />
                    <InputConError
                        label="Contraseña"
                        placeholder="********"
                        value={password}
                        onChangeText={(v) => { setPassword(v); limpiarError('password'); }}
                        secureTextEntry
                        error={errores.password}
                    />
                    <Boton titulo="Registrarse" onPress={handleRegister} />
                    <TouchableOpacity style={styles.linkContainer} onPress={() => router.back()}>
                        <Text style={styles.linkText}>
                            ¿Ya tienes cuenta? <Text style={styles.linkTextBold}>Inicia Sesión</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TransicionComida ref={transicionRef} imageUrl={animacionConfig.transicion.imagenUrl} color="#ff4b4b" />
        </KeyboardAvoidingView>
    );
};
