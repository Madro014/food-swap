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

                // 3. Traer los platos del endpoint "ALL" para asegurar visibilidad inmediata
                const dishesRes = await platosService.listarPlatosActivos(token);
                
                if (dishesRes.success && dishesRes.data) {
                    const lista: PlatoType[] = dishesRes.data.map(d => ({
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
