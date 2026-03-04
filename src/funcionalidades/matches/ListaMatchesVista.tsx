import { TarjetaMatch } from '@/src/compartido/componentes/moleculas/TarjetaMatch';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { PlatoType, useMatchesStore } from './useMatchesStore';
import { styles } from './ListaMatchesVista.styles';

export default function ListaMatchesVista() {
    const { matches } = useMatchesStore();

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
                    renderItem={({ item }: { item: PlatoType }) => <TarjetaMatch plato={item} />}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
}
