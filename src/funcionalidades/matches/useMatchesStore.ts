import { create } from 'zustand';

// definimos cómo se ve un Plato para TypeScript
export interface PlatoType {
    id: number;
    nombre: string;
    restaurante: string;
    foto: string;
    lat: number;
    lon: number;
    distancia: number;
}

// asi será la memoria de nuestra tienda
interface MatchesStore {
    matches: PlatoType[];         // lista de los platos que te gustaron
    agregarMatch: (plato: PlatoType) => void; // funcion para añadir uno nuevo
    limpiarMatches: () => void;   // funcion para borrarlos todos (opcional)
}

// creamos la "caja fuerte" que guarda nuestros matches disponibles en toda la app
export const useMatchesStore = create<MatchesStore>((set) => ({
    matches: [], // empezamos sin matches

    // esta funcion se llama cuando deslizas a la derecha
    agregarMatch: (plato) =>
        set((estadoActual) => {
            // verificamos que no esté ya en la lista para no repetirlo
            const yaExiste = estadoActual.matches.some(p => p.id === plato.id);
            if (yaExiste) return estadoActual;

            // lo ponemos de primero en la lista
            return { matches: [plato, ...estadoActual.matches] };
        }),

    limpiarMatches: () => set({ matches: [] })
}));
