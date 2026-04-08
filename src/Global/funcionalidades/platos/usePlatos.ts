import { useEffect, useState } from 'react';
import { pedirPermisosUbicacion } from '@backend/UbicacionServicio';
import { PlatoType } from '../matches/useMatchesStore';
import { geoService } from '@backend/geoService';
import { useAuthStore } from '../auth/useAuthStore';

export function usePlatos() {
    const [platos, setPlatos] = useState<PlatoType[]>([]);
    const [cargando, setCargando] = useState(true);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const { token } = useAuthStore();

    useEffect(() => {
        async function cargar() {
            if (!token) {
                setCargando(false);
                return;
            }

            try {
                // 1. Obtener ubicación
                const ubi = await pedirPermisosUbicacion();
                const lat = ubi?.latitud ?? 0;
                const lon = ubi?.longitud ?? 0;

                // 2. Gestionar sesión de swipe
                let curSessionId: string;
                const sesionRes = await geoService.obtenerSesionActiva(token);
                
                if (sesionRes.success && sesionRes.data) {
                    curSessionId = sesionRes.data.id;
                } else {
                    // Si no hay sesión, crear una nueva con 10km de radio
                    const nuevaSesion = await geoService.iniciarSesionSwipe(token, lat, lon, 10);
                    if (!nuevaSesion.success || !nuevaSesion.data) {
                        throw new Error('No se pudo crear sesión de swipe');
                    }
                    curSessionId = nuevaSesion.data.id;
                }
                
                setSessionId(curSessionId);

                // 3. Traer feed
                const feedRes = await geoService.obtenerPlatosCercanos(token, curSessionId, 1, 20);
                if (feedRes.success && feedRes.data) {
                    const lista: PlatoType[] = feedRes.data.data.dishes.map(d => ({
                        id: d.id,
                        nombre: d.name,
                        restaurante: d.company.name,
                        foto: d.photo_url || '',
                        lat: ubi?.latitud ?? 0, 
                        lon: ubi?.longitud ?? 0,
                        distancia: d.company.distance_km,
                    })).reverse(); 
                    
                    setPlatos(lista);
                } else {
                    setPlatos([]);
                }
            } catch (error) {
                console.log(error);
                setPlatos([]);
            } finally {
                setCargando(false);
            }
        }
        cargar();
    }, [token]);

    const quitar = (id: string) => setPlatos(prev => prev.filter(p => p.id !== id));

    return { platos, cargando, quitar, sessionId };
}
