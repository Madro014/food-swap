import React from 'react';
import { SafeAreaView } from 'react-native';
import { useAuthStore } from '@/src/funcionalidades/auth/useAuthStore';
import { useRouter } from 'expo-router';
import { styles } from '@/src/funcionalidades/negocio/dashboard.styles';

import { HeaderDashboardNegocio } from '@/src/funcionalidades/negocio/componentes/organismos/HeaderDashboardNegocio';
import { ListaPlatosNegocio } from '@/src/funcionalidades/negocio/componentes/organismos/ListaPlatosNegocio';
import { BotonSubirPlato } from '@/src/funcionalidades/negocio/componentes/atomos/BotonSubirPlato';

export default function NegocioDashboard() {
    const userName = useAuthStore(state => state.userName);
    const userAvatar = useAuthStore(state => state.userAvatar);
    const platosNegocio = useAuthStore(state => state.platosNegocio);
    const logout = useAuthStore(state => state.logout);
    const router = useRouter();

    return (
        <SafeAreaView style={styles.contenedorPadre}>
            <HeaderDashboardNegocio 
                userName={userName} 
                userAvatar={userAvatar} 
                onLogout={logout} 
            />

            <ListaPlatosNegocio platosNegocio={platosNegocio} />

            <BotonSubirPlato onPress={() => router.push('/(wizard)' as any)} />
        </SafeAreaView>
    );
}
