import { useEffect, useState } from 'react';
import { pedirPermisosUbicacion } from '@api/UbicacionServicio';
import { PlatoType } from '../matches/useMatchesStore';
import { geoService } from '@api/geoService';
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
                const ubi = await pedirPermisosUbicacion();
                const lat = ubi?.latitud ?? 0;
                const lon = ubi?.longitud ?? 0;

                const sesionRes = await geoService.obtenerSesionActiva(token);
                let curSessionId: string | null = null;
                
                if (sesionRes.success && sesionRes.data) {
                    curSessionId = sesionRes.data.id;
                } else {
                    const nuevaSesion = await geoService.iniciarSesionSwipe(token, lat, lon, 10);
                    if (nuevaSesion.success && nuevaSesion.data) {
                        curSessionId = nuevaSesion.data.id;
                    }
                }
                setSessionId(curSessionId);

                if (!curSessionId) {
                    setPlatos([]);
                    setCargando(false);
                    return;
                }

                const dishesRes = await geoService.obtenerPlatosCercanos(token, curSessionId);
                
                if (dishesRes.success && dishesRes.data) {
                    const lista: PlatoType[] = dishesRes.data.data.dishes.map((d: any) => ({
                        id: d.id,
                        nombre: d.name,
                        restaurante: d.company?.name || 'Restaurante Local',
                        foto: d.photo_url || d.photoURL || '',
                        lat: d.company?.lat ?? lat, 
                        lon: d.company?.lng ?? lon,
                        distancia: d.company?.distance_km ?? 0,
                        precio: d.price || 0,
                        descripcion: d.description || '',
                    }));
                    
                    setPlatos(lista);
                } else {
                    setPlatos([]);
                }
            } catch (error) {
                console.log("Error cargando platos:", error);
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
