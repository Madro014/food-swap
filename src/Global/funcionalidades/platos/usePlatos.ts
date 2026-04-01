import platosData from '@/assets/data/platos.json';
import { useEffect, useState } from 'react';
import { pedirPermisosUbicacion } from '@backend/UbicacionServicio';
import { PlatoType } from '../matches/useMatchesStore';

export function usePlatos() {
    const [platos, setPlatos] = useState<PlatoType[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        async function cargar() {
            try {
                const ubi = await pedirPermisosUbicacion();
                const lista: PlatoType[] = platosData.map(p => ({
                    ...p,
                    lat: ubi?.latitud ?? 0,
                    lon: ubi?.longitud ?? 0,
                }));
                const filtrada = (ubi ? lista.filter(p => p.distancia <= 5) : lista).reverse();
                setPlatos(filtrada);
            } catch {
                setPlatos([]);
            } finally {
                setCargando(false);
            }
        }
        cargar();
    }, []);

    const quitar = (id: number) => setPlatos(prev => prev.filter(p => p.id !== id));

    return { platos, cargando, quitar };
}
