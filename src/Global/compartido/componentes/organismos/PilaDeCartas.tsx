import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Platform } from 'react-native';
import TarjetaDeComida from '../TarjetaTinder';
import { PlatoType } from '@Global/funcionalidades/matches/useMatchesStore';
import { styles } from './PilaDeCartas.styles';
import { IconSymbol } from '@Global/components/ui/icon-symbol';
import Animated, { 
    useSharedValue, 
    useAnimatedStyle, 
    withRepeat, 
    withTiming, 
    withSequence 
} from 'react-native-reanimated';

interface PilaDeCartasProps {
    platos: PlatoType[];
    cargando: boolean;
    onAceptar: (plato: PlatoType) => void;
    onRechazar: (plato: PlatoType) => void;
    limiteAlcanzado?: boolean;
}

export function PilaDeCartas({ platos, cargando, onAceptar, onRechazar, limiteAlcanzado }: PilaDeCartasProps) {
    const scale = useSharedValue(1);

    useEffect(() => {
        // Animación de pulso suave e infinita para los botones
        scale.value = withRepeat(
            withSequence(
                withTiming(1.08, { duration: 800 }),
                withTiming(1, { duration: 800 })
            ),
            -1, // infinito
            true // reverse
        );
    }, [scale]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    if (cargando) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF6B35" />
                <Text style={styles.loadingText}>Buscando los mejores platos para ti...</Text>
            </View>
        );
    }

    if (platos.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>{limiteAlcanzado ? '🔒' : '🍽️'}</Text>
                <Text style={styles.emptyText}>
<<<<<<< HEAD
                    {limiteAlcanzado ? '¡Límite de Matches alcanzado!' : '¡Nada por hoy!'}
=======
                    {limiteAlcanzado ? '¡Límite de Matches alcanzado!' : '¡Has visto todo por hoy!'}
>>>>>>> origin/main
                </Text>
                <Text style={styles.emptySub}>
                    {limiteAlcanzado 
                        ? 'Has llegado al máximo de 3 matches. Gestiona tus platos actuales en la pestaña de Matches para seguir descubriendo.'
                        : 'Vuelve más tarde o amplía tu radio de búsqueda para descubrir nuevos sabores.'}
                </Text>
            </View>
        );
    }

    // Renderizar hasta 3 cartas para dar profundidad
    const platosVisibles = platos.slice(0, 3);

    return (
        <View style={styles.stack}>
            <View style={styles.cardsContainer}>
                {platosVisibles.map((plato, index) => {
                    const esActiva = index === 0;
                    
                    // Todas las cartas son absolutas para que se apilen correctamente
                    const cardStyle = {
                        position: 'absolute' as const,
                        width: '100%',
                        height: '100%',
                        zIndex: 10 - index,
                        opacity: esActiva ? 1 : 0.4,
                        transform: [
                            { scale: esActiva ? 1 : 0.85 },
                            { translateX: index === 0 ? 0 : (index === 1 ? (Platform.OS === 'web' ? 420 : 120) : (Platform.OS === 'web' ? -420 : -120)) }
                        ],
                        ...(Platform.OS === 'web' && !esActiva && { filter: 'blur(10px)' } as any)
                    };

                    return (
                        <View key={plato.id} style={cardStyle}>
                            <TarjetaDeComida 
                                plato={plato}
                                alAceptar={esActiva ? onAceptar : () => {}}
                                alRechazar={esActiva ? onRechazar : () => {}}
                                deshabilitada={!esActiva}
                            />
                        </View>
                    );
                })}
            </View>

            {/* Acciones de Tinder Premium - X y Corazón con etiquetas */}
            <View style={styles.actionsContainer}>
                <Animated.View style={[styles.actionButtonWrapper, animatedStyle]}>
                    <TouchableOpacity 
                        style={[styles.actionButton, styles.buttonX]} 
                        onPress={() => onRechazar(platos[0])}
                        activeOpacity={0.7}
                    >
                        <IconSymbol name="xmark" size={30} color="#EF4444" />
                    </TouchableOpacity>
                    <Text style={[styles.actionButtonLabel, styles.actionButtonLabelX]}>Rechazar</Text>
                </Animated.View>

                <Animated.View style={[styles.actionButtonWrapper, animatedStyle]}>
                    <TouchableOpacity 
                        style={[styles.actionButton, styles.actionButtonLarge, styles.buttonHeart]} 
                        onPress={() => onAceptar(platos[0])}
                        activeOpacity={0.7}
                    >
                        <IconSymbol name="heart.fill" size={36} color="#10B981" />
                    </TouchableOpacity>
                    <Text style={[styles.actionButtonLabel, styles.actionButtonLabelHeart]}> Lo quiero!</Text>
                </Animated.View>
            </View>
        </View>
    );
}