import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, ActivityIndicator, View, Alert } from 'react-native';
import { useAuthStore } from '@Global/funcionalidades/auth/useAuthStore';
import { useRouter } from 'expo-router';
import { styles } from '@Global/funcionalidades/negocio/dashboard.styles';
import { platosService } from '@api/platosService';

import { HeaderDashboardNegocio } from '@Global/funcionalidades/negocio/componentes/organismos/HeaderDashboardNegocio';
import { ListaPlatosNegocio } from '@Global/funcionalidades/negocio/componentes/organismos/ListaPlatosNegocio';
import { BotonSubirPlato } from '@Global/funcionalidades/negocio/componentes/atomos/BotonSubirPlato';

interface PlatoDashboard {
    id: string;
    nombreRestaurante: string;
    nombrePlato: string;
    imagenUri: string | null;
}

export default function NegocioDashboard() {
    const { userName, userAvatar, logout, token } = useAuthStore();
    const router = useRouter();
    
    const [platosNegocio, setPlatosNegocio] = useState<PlatoDashboard[]>([]);
    const [cargando, setCargando] = useState(true);

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

        // Confirmación antes de borrar
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

        // En web window.confirm, en móvil Alert.alert
        if (typeof window !== 'undefined' && (window as any).confirm) {
            if (confirm('¿Estás seguro de que quieres eliminar este plato?')) {
                await confirmar();
            }
        } else {
            alert('¿Estás seguro de que quieres eliminar este plato permanentemente?');
            // Nota: En un entorno de producción, puedes usar un modal personalizado en vez de Alert importado de react-native.
        }
    };

    return (
        <SafeAreaView style={styles.contenedorPadre}>
            <HeaderDashboardNegocio 
                userName={userName} 
                userAvatar={userAvatar} 
                onLogout={logout} 
            />

            {cargando ? (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#FF4500" />
                </View>
            ) : (
                <ListaPlatosNegocio 
                    platosNegocio={platosNegocio} 
                    onEliminarPlato={eliminarPlato}
                />
            )}

            <BotonSubirPlato onPress={() => router.push('/crear-plato' as any)} />
        </SafeAreaView>
    );
}
