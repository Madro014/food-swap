import React, { useEffect, useState, useReducer } from 'react';
import { View, Text, ScrollView, ActivityIndicator, FlatList, Image, TouchableOpacity, StatusBar } from 'react-native';
import { HeaderApp } from '@Global/compartido/componentes/organismos/HeaderApp';
import { useAuthStore } from '../auth/useAuthStore';
import { geoService } from '@api/geoService';
import { platosService } from '@api/platosService';
import { pedirPermisosUbicacion } from '@api/UbicacionServicio';
import { Plato } from '@api/contracts/api';
import { useRouter } from 'expo-router';
import { styles } from './DashboardUsuario.styles';
import { IconSymbol } from '@Global/components/ui/icon-symbol';

type State = {
    platos: Plato[];
    cargando: boolean;
};

type Action = 
    | { type: 'INICIAR_CARGA' }
    | { type: 'SET_PLATOS'; payload: Plato[] }
    | { type: 'ERROR_CARGA' };

const initialState: State = {
    platos: [],
    cargando: true,
};

function dashboardReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'INICIAR_CARGA':
            return { ...state, cargando: true };
        case 'SET_PLATOS':
            return { ...state, platos: action.payload, cargando: false };
        case 'ERROR_CARGA':
            return { ...state, cargando: false };
        default:
            return state;
    }
}

export default function DashboardUsuarioVista() {
    const { userName, userAvatar, logout, token } = useAuthStore();
    const router = useRouter();
    const [state, dispatch] = useReducer(dashboardReducer, initialState);
    const [categoriaActiva, setCategoriaActiva] = useState('Todos');

    const categorias = ['Todos', 'Populares', 'Cerca de ti', 'Promociones', 'Desayunos'];

    useEffect(() => {
        const fetchPlatos = async () => {
            if (!token) {
                dispatch({ type: 'ERROR_CARGA' });
                return;
            }

            try {
                const ubi = await pedirPermisosUbicacion();
                const lat = ubi?.latitud ?? 0;
                const lon = ubi?.longitud ?? 0;

                const sesionRes = await geoService.obtenerSesionActiva(token);
                let sessionId: string | null = null;

                if (sesionRes.success && sesionRes.data) {
                    sessionId = sesionRes.data.session_id;
                } else {
                    const nuevaSesion = await geoService.iniciarSesionSwipe(token, lat, lon, 10);
                    if (nuevaSesion.success && nuevaSesion.data) {
                        sessionId = nuevaSesion.data.session_id;
                    }
                }

                if (sessionId) {
                    const res = await geoService.obtenerPlatosCercanos(token, sessionId);
                    if (res.success && res.data && res.data.data.dishes.length > 0) {
                        const platosMapeados: Plato[] = res.data.data.dishes.map((d: any) => ({
                            id: d.id,
                            empresaId: d.company?.id || '',
                            nombrePlato: d.name,
                            nombreRestaurante: d.company?.name || 'Restaurante Local',
                            imagenUri: d.photo_url || '',
                            precio: d.price,
                            descripcion: d.description || '',
                            activo: true,
                        }));
                        dispatch({ type: 'SET_PLATOS', payload: platosMapeados });
                    } else {
                        // Fallback a platos generales si no hay cercanos
                        const generalRes = await platosService.listarPlatosActivos(token);
                        if (generalRes.success && generalRes.data) {
                            dispatch({ type: 'SET_PLATOS', payload: generalRes.data });
                        } else {
                            dispatch({ type: 'ERROR_CARGA' });
                        }
                    }
                } else {
                    const generalRes = await platosService.listarPlatosActivos(token);
                    if (generalRes.success && generalRes.data) {
                        dispatch({ type: 'SET_PLATOS', payload: generalRes.data });
                    } else {
                        dispatch({ type: 'ERROR_CARGA' });
                    }
                }
            } catch (error) {
                console.error("Error al cargar platos en dashboard:", error);
                dispatch({ type: 'ERROR_CARGA' });
            }
        };
        fetchPlatos();
    }, [token]);

    const handleLogout = () => {
        logout();
        router.replace('/login');
    };

    const renderTarjetaPlato = ({ item }: { item: Plato }) => (
        <TouchableOpacity 
            activeOpacity={0.9}
            style={styles.card}
            onPress={() => {/* Navegar a detalle */}}
        >
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.imagenUri || '' }} style={styles.imageFixed} />
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>Nuevo</Text>
                </View>
                <View style={styles.priceTag}>
                    <Text style={styles.priceText}>${item.precio}</Text>
                </View>
            </View>
            
            <View style={styles.info}>
                <Text style={styles.restaurant}>{item.nombreRestaurante || 'Restaurante Exclusivo'}</Text>
                <Text style={styles.nombre} numberOfLines={1}>{item.nombrePlato}</Text>
                <Text style={styles.descripcion} numberOfLines={2}>
                    {item.descripcion || 'Una delicia preparada con los mejores ingredientes locales.'}
                </Text>
                
                <View style={styles.cardFooter}>
                    <View style={styles.ratingContainer}>
                        <Text style={{ fontSize: 14 }}>⭐</Text>
                        <Text style={styles.ratingText}>4.8</Text>
                    </View>
                    <TouchableOpacity style={styles.botonAccion}>
                        <IconSymbol name="plus" size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (state.cargando) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#FF6B35" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <HeaderApp userName={userName} userAvatar={userAvatar} onLogout={handleLogout} />
            
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Header Section */}
                <View style={styles.headerGradient}>
                    <View style={styles.welcomeSection}>
                        <Text style={styles.welcomeTitle}>¡Hola, {userName}! 👋</Text>
                        <Text style={styles.welcomeSubtitle}>
                            ¿Qué te apetece saborear hoy? Tenemos platos increíbles esperando.
                        </Text>
                    </View>
                </View>

                {/* Categories Flow */}
                <View style={styles.categoriesContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {categorias.map((cat) => (
                            <TouchableOpacity 
                                key={cat} 
                                style={[styles.categoryPill, categoriaActiva === cat && styles.categoryPillActive]}
                                onPress={() => setCategoriaActiva(cat)}
                            >
                                <Text style={[styles.categoryText, categoriaActiva === cat && styles.categoryTextActive]}>
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.mainSection}>
                    {/* Featured Item (Solo si hay platos) */}
                    {state.platos.length > 0 && (
                        <View style={styles.featuredCard}>
                            <View style={styles.featuredInfo}>
                                <View style={styles.featuredBadge}>
                                    <Text style={styles.featuredBadgeText}>RECOMENDADO</Text>
                                </View>
                                <Text style={styles.featuredTitle}>Descubre nuevos sabores</Text>
                                <Text style={styles.featuredSub}>
                                    Explora las creaciones más recientes de los chefs de tu ciudad.
                                </Text>
                                <TouchableOpacity style={styles.featuredButton} onPress={() => {/* Acción */}}>
                                    <Text style={styles.featuredButtonText}>Explorar ahora</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ fontSize: 60 }}>🥙</Text>
                        </View>
                    )}

                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Platos Destacados</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>Ver todos</Text>
                        </TouchableOpacity>
                    </View>

                    {state.platos.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyIcon}>🥺</Text>
                            <Text style={styles.emptyText}>Ciudad sin platos hoy</Text>
                            <Text style={styles.emptySub}>Vuelve pronto, los chefs están preparando cosas ricas.</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={state.platos}
                            renderItem={renderTarjetaPlato}
                            keyExtractor={(item) => item.id}
                            numColumns={2}
                            scrollEnabled={false}
                            columnWrapperStyle={styles.columnWrapper}
                        />
                    )}
                </View>
            </ScrollView>
        </View>
    );
}
