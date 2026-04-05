import { TarjetaMatch } from '@Global/compartido/componentes/moleculas/TarjetaMatch';
import { HeaderApp } from '@Global/compartido/componentes/organismos/HeaderApp';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Text, View, useWindowDimensions } from 'react-native';
import { useAuthStore } from '../auth/useAuthStore';
import { PlatoType, useMatchesStore } from './useMatchesStore';
import { styles } from './ListaMatchesVista.styles';

export default function ListaMatchesVista() {
    const { matches } = useMatchesStore();
    const { userName, userAvatar, logout } = useAuthStore();
    const router = useRouter();
    const { width } = useWindowDimensions();
    
    // Determine dynamic columns based on screen width
    const isDesktop = width > 1024;
    const isTablet = width > 768;
    const columnas = isDesktop ? 3 : isTablet ? 2 : 1;

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
                    <FlatList
                        key={columnas} // Force re-render when columns change
                        data={matches}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }: { item: PlatoType }) => (
                           <View style={{ flex: 1, margin: 10 }}>
                               <TarjetaMatch plato={item} isWeb={isTablet} />
                           </View>
                        )}
                        numColumns={columnas}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            )}
        </View>
    );
}
