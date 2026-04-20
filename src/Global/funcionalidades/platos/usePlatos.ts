import { useEffect, useState } from 'react';
import { pedirPermisosUbicacion } from '@api/UbicacionServicio';
import { PlatoType } from '../matches/useMatchesStore';
import { geoService } from '@api/geoService';
import { platosService } from '@api/platosService';
import { useAuthStore } from '../auth/useAuthStore';

export function usePlatos() {
    const [platos, setPlatos] = useState<PlatoType[]>([]);
    const [cargando, setCargando] = useState(true);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const { token, alcanceKm } = useAuthStore();

    useEffect(() => {
        async function cargar() {
            console.log('[DEBUG usePlatos] Token:', token);
            console.log('[DEBUG usePlatos] AlcanceKm:', alcanceKm);

            if (!token) {
                console.log('[DEBUG usePlatos] No hay token, saliendo');
                setCargando(false);
                return;
            }

            try {
                // 1. Obtener ubicación
                const ubi = await pedirPermisosUbicacion();
                const lat = ubi?.latitud ?? 0;
                const lon = ubi?.longitud ?? 0;

                // 2. Gestionar sesión de swipe
                const sesionRes = await geoService.obtenerSesionActiva(token);
                let curSessionId: string | null = null;
                
                if (sesionRes.success && sesionRes.data) {
                    curSessionId = sesionRes.data.session_id;
                } else {
                    const nuevaSesion = await geoService.iniciarSesionSwipe(token, lat, lon, alcanceKm || 10);
                    if (nuevaSesion.success && nuevaSesion.data) {
                        curSessionId = nuevaSesion.data.session_id;
                    }
                }
                setSessionId(curSessionId);

                if (!curSessionId) {
                    setPlatos([]);
                    setCargando(false);
                    return;
                }

                // 3. Traer los platos cercanos usando la sesión activa
                const dishesRes = await geoService.obtenerPlatosCercanos(token, curSessionId);
                
                if (dishesRes.success && dishesRes.data) {
                    const lista: PlatoType[] = dishesRes.data.data.dishes.map((d: any) => ({
                        id: d.id,
                        nombre: d.name,
                        restaurante: d.company?.name || 'Restaurante Local',
                        foto: d.photo_url || '',
                        lat: d.company?.lat ?? lat, 
                        lon: d.company?.lng ?? lon,
                        distancia: d.company?.distance_km ?? 0,
                        precio: d.price || 0,
                        descripcion: d.description || '',
                    }));
                    
                    setPlatos(lista);
                } else {
                    // Fallback a listar platos activos si la geo-búsqueda falla o no devuelve nada
                    const fallbackRes = await platosService.listarPlatosActivos(token);
                    if (fallbackRes.success && fallbackRes.data) {
                        const fallbackLista: PlatoType[] = fallbackRes.data.map(d => ({
                            id: d.id,
                            nombre: d.nombrePlato,
                            restaurante: d.nombreRestaurante || 'Restaurante Local',
                            foto: d.imagenUri || '',
                            lat: lat,
                            lon: lon,
                            distancia: 0,
                            precio: d.precio || 0,
                            descripcion: d.descripcion || '',
                        }));
                        setPlatos(fallbackLista);
                    } else {
                        setPlatos([]);
                    }
                }
            } catch (error) {
                console.log("Error cargando platos:", error);
                setPlatos([]);
            } finally {
                setCargando(false);
            }
        }
        cargar();
    }, [token, alcanceKm]);

    const quitar = (id: string) => setPlatos(prev => prev.filter(p => p.id !== id));

    return { platos, cargando, quitar, sessionId };
}
