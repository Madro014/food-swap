import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { PlatoType } from '@/src/funcionalidades/matches/useMatchesStore';
import TarjetaDeComida from '../TarjetaTinder';
import { styles } from './PilaDeCartas.styles';

interface PilaDeCartasProps {
    platos: PlatoType[];
    cargando: boolean;
    onAceptar: (plato: PlatoType) => void;
    onRechazar: (plato: PlatoType) => void;
}

export function PilaDeCartas({ platos, cargando, onAceptar, onRechazar }: PilaDeCartasProps) {
    if (cargando) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF6B6B" />
                <Text style={styles.loadingText}>Buscando comida rica cerca...</Text>
            </View>
        );
    }

    return (
        <View style={styles.stack}>
            <View style={styles.cardsContainer}>
                {platos.length > 0 ? (
                    platos.map((plato) => (
                        <TarjetaDeComida
                            key={plato.id}
                            plato={plato}
                            alAceptar={onAceptar}
                            alRechazar={onRechazar}
                        />
                    ))
                ) : (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>¡No hay más platos!</Text>
                        <Text style={styles.emptySubText}>Vuelve más tarde o amplía tu búsqueda.</Text>
                    </View>
                )}
            </View>
            <View style={styles.actionsContainer}>
                <View style={styles.actionButton}>
                    <Text style={[styles.actionIcon, { color: '#F87171' }]}>❌</Text>
                </View>
                <View style={[styles.actionButton, { width: 50, height: 50, borderRadius: 25 }]}>
                    <Text style={[styles.actionIcon, { fontSize: 22, color: '#38BDF8' }]}>⭐</Text>
                </View>
                <View style={styles.actionButton}>
                    <Text style={[styles.actionIcon, { color: '#4ADE80' }]}>💚</Text>
                </View>
            </View>
        </View>
    );
}
