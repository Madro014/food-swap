import React, { useEffect, useState, useCallback } from 'react';
import {
    ActivityIndicator, View, Alert,
    Modal, KeyboardAvoidingView, Platform, ScrollView,
    TouchableWithoutFeedback
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@Global/funcionalidades/auth/useAuthStore';
import { useRouter } from 'expo-router';
import { styles } from '@Global/funcionalidades/negocio/dashboard.styles';
import { platosService } from '@api/platosService';

import { HeaderApp } from '@Global/compartido/componentes/organismos/HeaderApp';
import { ListaPlatosNegocio } from '@Global/funcionalidades/negocio/componentes/organismos/ListaPlatosNegocio';
import { NavBarNegocio } from '@Global/funcionalidades/negocio/componentes/organismos/NavBarNegocio';
import { FormularioPlato } from '@Global/funcionalidades/negocio/componentes/organismos/FormularioPlato';

interface PlatoDashboard {
    id: string;
    nombreRestaurante: string;
    nombrePlato: string;
    imagenUri: string | null;
}

export default function NegocioDashboard() {
    const { userName, userAvatar, logout, token } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.replace('/login');
    };

    const [platosNegocio, setPlatosNegocio] = useState<PlatoDashboard[]>([]);
    const [cargando, setCargando] = useState(true);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [subiendo, setSubiendo] = useState(false);

    const cargarPlatos = useCallback(async () => {
        if (!token) return;
        const res = await platosService.listarPlatosNegocio(token);
        if (res.success && res.data) {
            const mapped = res.data.map(p => ({
                id: p.id,
                nombreRestaurante: p.nombreRestaurante || userName || 'Mi Restaurante',
                nombrePlato: p.nombrePlato,
                imagenUri: p.imagenUri
            }));
            setPlatosNegocio(mapped.reverse());
        }
        setCargando(false);
    }, [token, userName]);

    useEffect(() => {
        cargarPlatos();
    }, [cargarPlatos]);

    const eliminarPlato = async (id: string) => {
        if (!token) return;

        const confirmar = async () => {
            setCargando(true);
            const res = await platosService.eliminarPlato(token, id);
            if (res.success) {
                await cargarPlatos();
            } else {
                Alert.alert('Error', res.message || 'No se pudo eliminar el plato');
                setCargando(false);
            }
        };

        if (typeof window !== 'undefined' && (window as any).confirm) {
            if (confirm('¿Estás seguro de que quieres eliminar este plato?')) {
                await confirmar();
            }
        } else {
            alert('¿Estás seguro de que quieres eliminar este plato permanentemente?');
        }
    };

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
            const result = await platosService.crearPlato(
                token,
                data.nombrePlato,
                data.precio,
                data.imagenUri,
                data.descripcion
            );
            if (result.success) {
                setMostrarFormulario(false);
                await cargarPlatos();
            } else {
                Alert.alert('Error', `No se pudo crear el plato: ${result.message}`);
            }
        } catch {
            Alert.alert('Error', 'Hubo un problema de conexión.');
        } finally {
            setSubiendo(false);
        }
    };

    return (
        <SafeAreaView style={styles.contenedorPadre}>
            <HeaderApp
                userName={userName}
                userAvatar={userAvatar}
                onLogout={handleLogout}
            />

            {cargando ? (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#FF6B35" />
                </View>
            ) : (
                <ListaPlatosNegocio
                    platosNegocio={platosNegocio}
                    onEliminarPlato={eliminarPlato}
                />
            )}

            {/* ── Navbar persistente ── */}
            <NavBarNegocio onPublicarPress={() => setMostrarFormulario(true)} />

            {/* ── Modal del formulario ── */}
            <Modal
                visible={mostrarFormulario}
                transparent
                animationType="slide"
                statusBarTranslucent
                onRequestClose={() => setMostrarFormulario(false)}
            >
                <TouchableWithoutFeedback onPress={() => setMostrarFormulario(false)}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modalKeyboard}
                    pointerEvents="box-none"
                >
                    <View style={styles.modalContenedor}>
                        <ScrollView
                            contentContainerStyle={styles.modalScroll}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                        >
                            <FormularioPlato
                                nombreRestauranteInicial={userName || ''}
                                alHacerSubmit={manejarCreacionPlato}
                                alCancelar={() => setMostrarFormulario(false)}
                                cargando={subiendo}
                            />
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </SafeAreaView>
    );
}