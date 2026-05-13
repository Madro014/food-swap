import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@Global/funcionalidades/auth/useAuthStore';
import { platosService } from '@api/platosService';
import { FormularioPlato } from '@Global/funcionalidades/negocio/componentes/organismos/FormularioPlato';
import { HeaderApp } from '@Global/compartido/componentes/organismos/HeaderApp';

export default function PaginaCrearPlato() {
    const router = useRouter();
    const { token, userName, userAvatar, logout } = useAuthStore();
    const [subiendo, setSubiendo] = useState(false);

    const manejarCreacionPlato = async (data: {
        nombreRestaurante: string;
        nombrePlato: string;
        precio: number;
        imagenUri: string;
        descripcion: string;
    }) => {
        if (!token) {
            Alert.alert('Acceso Denegado', 'Debes iniciar sesión para publicar un plato.');
            router.replace('/login');
            return;
        }
        
        setSubiendo(true);
        try {
            const result = await platosService.crearPlato(
                token, 
                data.nombrePlato, 
                data.precio, 
                data.imagenUri, 
                data.descripcion
            );

            if (result.success) {
                router.replace('/(negocio)');
            } else {
                Alert.alert('Error', result.message || 'No pudimos crear tu plato en este momento.');
            }
        } catch (error) {
            Alert.alert('Conexión', 'Hubo un problema al contactar con el servidor.');
            console.error("Error al crear plato:", error);
        } finally {
            setSubiendo(false);
        }
    };

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
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView 
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <FormularioPlato 
                        nombreRestauranteInicial={userName || ''} 
                        alHacerSubmit={manejarCreacionPlato}
                        alCancelar={() => {
                            if (router.canGoBack()) {
                                router.back();
                            } else {
                                router.replace('/(negocio)');
                            }
                        }}
                        cargando={subiendo}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FF7E40', 
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 24,
    }
});