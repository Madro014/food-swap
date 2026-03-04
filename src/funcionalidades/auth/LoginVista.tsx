import { FondoAnimadoComida } from '@/src/compartido/componentes/FondoAnimadoComida';
import { TransicionComida, TransicionComidaRef } from '@/src/compartido/componentes/TransicionComida';
import animacionConfig from '@/src/compartido/config/animacion.json';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './LoginVista.styles';
import { useAuthStore } from './useAuthStore';

export const LoginVista = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const loginAction = useAuthStore(state => state.login);
    const transicionRef = useRef<TransicionComidaRef>(null);

    const handleLogin = () => {
        // Start animation, then navigate
        loginAction(email.split('@')[0] || 'Foodie');
        if (transicionRef.current) {
            transicionRef.current.iniciar(() => {
                router.replace('/(tabs)');
            });
        } else {
            router.replace('/(tabs)');
        }
    };

    const handleRegister = () => {
        router.push('/registro');
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <StatusBar style="dark" />

            {/* Animated Food Background */}
            <FondoAnimadoComida />

            <View style={styles.content}>
                <View style={styles.logoContainer}>
                    <Image
                        source={{ uri: 'https://res.cloudinary.com/dzdgdqoap/image/upload/v1772550710/foodmatch_osnrsz.png' }}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.subtitle}>Encuentra el sabor que buscas</Text>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Correo Electrónico</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="tu@correo.com"
                            placeholderTextColor="#9BA1A6"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="********"
                            placeholderTextColor="#9BA1A6"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.linkContainer} onPress={handleRegister}>
                        <Text style={styles.linkText}>
                            ¿No tienes cuenta? <Text style={styles.linkTextBold}>Regístrate</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TransicionComida ref={transicionRef} imageUrl={animacionConfig.transicion.imagenUrl} color="#ff4b4b" />
        </KeyboardAvoidingView>
    );
};