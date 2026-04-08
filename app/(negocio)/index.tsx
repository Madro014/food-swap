import React, { useEffect, useState } from 'react';
import { SafeAreaView, ActivityIndicator, View } from 'react-native';
import { useAuthStore } from '@Global/funcionalidades/auth/useAuthStore';
import { useRouter } from 'expo-router';
import { styles } from '@Global/funcionalidades/negocio/dashboard.styles';
import { platosService } from '@backend/platosService';

import { HeaderDashboardNegocio } from '@Global/funcionalidades/negocio/componentes/organismos/HeaderDashboardNegocio';
import { ListaPlatosNegocio } from '@Global/funcionalidades/negocio/componentes/organismos/ListaPlatosNegocio';
import { BotonSubirPlato } from '@Global/funcionalidades/negocio/componentes/atomos/BotonSubirPlato';

export default function NegocioDashboard() {
    const { userName, userAvatar, logout, token } = useAuthStore();
    const router = useRouter();
    
    const [platosNegocio, setPlatosNegocio] = useState<{ nombreRestaurante: string, nombrePlato: string, imagenUri: string | null }[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarPlatos = async () => {
            if (!token) return;
            const res = await platosService.listarPlatosNegocio(token);
            if (res.success && res.data) {
                const mapped = res.data.map(p => ({
                    nombreRestaurante: p.nombreRestaurante || userName || 'Mi Restaurante',
                    nombrePlato: p.nombrePlato,
                    imagenUri: p.imagenUri
                }));
                // Mostrar siempre los más recientes primero
                setPlatosNegocio(mapped.reverse());
            }
            setCargando(false);
        };
        cargarPlatos();
    }, [token]);

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
                <ListaPlatosNegocio platosNegocio={platosNegocio} />
            )}

            <BotonSubirPlato onPress={() => router.push('/(wizard)' as any)} />
        </SafeAreaView>
    );
}
