import { create } from 'zustand';

// Definimos cómo se ve un Plato para TypeScript
export interface PlatoType {
    id: number;
    nombre: string;
    restaurante: string;
    foto: string;
    lat: number;
    lon: number;
    distancia: number;
}

// Así será la memoria de nuestra tienda
interface MatchesStore {
    matches: PlatoType[];         // Lista de los platos que te gustaron
    agregarMatch: (plato: PlatoType) => void; // Función para añadir uno nuevo
    limpiarMatches: () => void;   // Función para borrarlos todos (opcional)
}

// Creamos la "caja fuerte" que guarda nuestros matches disponibles en toda la app
export const useMatchesStore = create<MatchesStore>((set) => ({
    matches: [], // empezamos sin matches

    // Esta función se llama cuando deslizas a la derecha
    agregarMatch: (plato) =>
        set((estadoActual) => {
            // Verificamos que no esté ya en la lista para no repetirlo
            const yaExiste = estadoActual.matches.some(p => p.id === plato.id);
            if (yaExiste) return estadoActual;

            // Lo ponemos de primero en la lista
            return { matches: [plato, ...estadoActual.matches] };
        }),

    limpiarMatches: () => set({ matches: [] })
}));
