import { TarjetaMatch } from '@Global/compartido/componentes/moleculas/TarjetaMatch';
import { HeaderApp } from '@Global/compartido/componentes/organismos/HeaderApp';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import { useAuthStore } from '../auth/useAuthStore';
import { useMatchesStore } from './useMatchesStore';
import { styles } from './ListaMatchesVista.styles';

export default function ListaMatchesVista() {
    const { matches } = useMatchesStore();
    const { userName, userAvatar, logout } = useAuthStore();
    const router = useRouter();
    const { width } = useWindowDimensions();
    
    // Determine dynamic layout based on screen width
    const isDesktop = width > 1024;
    const isTablet = width > 768;

    const handleLogout = () => {
        logout();
        router.replace('/login');
    };

    return (
        <View style={styles.container}>
            <HeaderApp userName={userName} userAvatar={userAvatar} onLogout={handleLogout} />
            <View style={[styles.headerSpace, isTablet && styles.headerSpaceWeb]}>
                <Text style={styles.title}>Tus Matches 🎉</Text>
                <Text style={styles.subtitle}>
                    {matches.length === 0
                        ? 'Aún no has hecho match con ningún plato.'
                        : `Tienes ${matches.length} platillos deliciosos esperando por ti.`}
                </Text>
            </View>

            {matches.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyIcon}>🥺</Text>
                    <Text style={styles.emptyText}>No hay matches todavía</Text>
                    <Text style={styles.emptySub}>Ve a descubrir platos para encontrar tu próximo favorito.</Text>
                </View>
            ) : (
                <View style={styles.listWrapper}>
                    <View style={[styles.matchesContainer, isDesktop && styles.matchesContainerWeb]}>
                        {matches.map((item) => (
                            <View key={item.id} style={[styles.matchItem, isTablet && styles.matchItemWeb]}>
                                <TarjetaMatch plato={item} isWeb={isTablet} />
                            </View>
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
}