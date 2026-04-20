import React, { useState } from 'react';
<<<<<<< HEAD
import { SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
=======
import { SafeAreaView, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
>>>>>>> origin/main
import { useRouter } from 'expo-router';
import { useAuthStore } from '@Global/funcionalidades/auth/useAuthStore';
import { platosService } from '@api/platosService';
import { FormularioPlato } from '@Global/funcionalidades/negocio/componentes/organismos/FormularioPlato';
<<<<<<< HEAD
import { HeaderApp } from '@Global/compartido/componentes/organismos/HeaderApp';
import { styles } from './crear-plato.styles';

export default function PaginaCrearPlato() {
    const router = useRouter();
    const { token, userName, userAvatar, logout } = useAuthStore();
=======

export default function PaginaCrearPlato() {
    const router = useRouter();
    const { token, userName } = useAuthStore();
>>>>>>> origin/main
    const [subiendo, setSubiendo] = useState(false);

    const manejarCreacionPlato = async (data: {
        nombreRestaurante: string;
        nombrePlato: string;
        precio: number;
        imagenUri: string;
        descripcion: string;
    }) => {
        if (!token) return;
        
        setSubiendo(true);
        try {
<<<<<<< HEAD
=======
            // Usamos la descripción y el precio reales del formulario
>>>>>>> origin/main
            const result = await platosService.crearPlato(
                token, 
                data.nombrePlato, 
                data.precio, 
                data.imagenUri, 
                data.descripcion
            );

            if (result.success) {
<<<<<<< HEAD
=======
                // Navegar de vuelta al dashboard de negocio
>>>>>>> origin/main
                router.replace('/(negocio)' as any);
            } else {
                alert(`Error al crear el plato: ${result.message}`);
                console.error("Error al crear plato:", result.message);
            }
        } catch (error) {
            alert('Hubo un problema de conexión al intentar subir el plato.');
            console.error("Error catch crear plato:", error);
        } finally {
            setSubiendo(false);
        }
    };

<<<<<<< HEAD
    const handleLogout = () => {
        logout();
        router.replace('/login');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <HeaderApp 
                userName={userName} 
                userAvatar={userAvatar} 
                onLogout={handleLogout} 
            />
=======
    return (
        <SafeAreaView style={styles.safeArea}>
>>>>>>> origin/main
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView 
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <FormularioPlato 
                        nombreRestauranteInicial={userName || ''} 
                        alHacerSubmit={manejarCreacionPlato}
<<<<<<< HEAD
                        alCancelar={() => router.back()}
=======
>>>>>>> origin/main
                        cargando={subiendo}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
<<<<<<< HEAD
}
=======
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 40,
    }
});
>>>>>>> origin/main
