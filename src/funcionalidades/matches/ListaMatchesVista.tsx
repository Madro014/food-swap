import * as Haptics from 'expo-haptics';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './ListaMatchesVista.styles';
import { PlatoType, useMatchesStore } from './useMatchesStore';

export default function ListaMatchesVista() {
    // Aquí traemos los matches (la lista) desde nuestro almacenamiento global
    const { matches } = useMatchesStore();

    // Componente individual de fila (Cada platillo que nos gustó)
    const renderFilaMatch = ({ item }: { item: PlatoType }) => (
        <View style={styles.matchCard}>
            <Image source={{ uri: item.foto }} style={styles.matchImage} />
            <View style={styles.matchInfo}>
                <Text style={styles.matchName}>{item.nombre}</Text>
                <Text style={styles.matchRestaurant}>🍽️ {item.restaurante} • 📍 {item.distancia}km</Text>
            </View>
            <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                    console.log("Mandar a pedir:", item.nombre);
                }}
            >
                <Text style={styles.actionIcon}>🛵</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerSpace}>
                <Text style={styles.title}>Mis Matches 💚</Text>
                <Text style={styles.subtitle}>
                    {matches.length === 0
                        ? 'Aún no te gusta nada.'
                        : `Tienes ${matches.length} platillos deliciosos esperando por ti.`}
                </Text>
            </View>

            {matches.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyIcon}>🥺</Text>
                    <Text style={styles.emptyText}>No hay matches todavía</Text>
                    <Text style={styles.emptySub}>Ve a deslizar platos para enconrar tu próxima comida favorita.</Text>
                </View>
            ) : (
                <FlatList
                    data={matches}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderFilaMatch}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
}
