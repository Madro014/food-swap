import React from 'react';
import { ActivityIndicator, Text, View, TouchableOpacity } from 'react-native';
import { PlatoType } from '@Global/funcionalidades/matches/useMatchesStore';
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

    const handleRechazar = () => {
        if (platos.length > 0) {
            onRechazar(platos[platos.length - 1]);
        }
    };

    const handleAceptar = () => {
        if (platos.length > 0) {
            onAceptar(platos[platos.length - 1]);
        }
    };

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
                <TouchableOpacity style={styles.actionButton} onPress={handleRechazar}>
                    <Text style={[styles.actionIcon, { color: '#F87171' }]}>❌</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, { width: 60, height: 60, borderRadius: 30 }]} onPress={handleAceptar}>
                    <Text style={[styles.actionIcon, { fontSize: 26, color: '#FFB800' }]}>⭐</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleAceptar}>
                    <Text style={[styles.actionIcon, { color: '#4ADE80' }]}>💚</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}