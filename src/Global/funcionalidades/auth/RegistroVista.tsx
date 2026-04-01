import { TransicionComidaRef } from '@Global/compartido/componentes/TransicionComida';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { FormularioRegistro } from './componentes/organismos/FormularioRegistro';
import { PlantillaAuth } from './componentes/plantillas/PlantillaAuth';
import { TEXTOS_AUTH } from './constantes/textos';
import { useAuthStore } from './useAuthStore';

export const RegistroVista = () => {
    const router = useRouter();
    const loginAction = useAuthStore(state => state.login);
    const transicionRef = useRef<TransicionComidaRef>(null);
    const textos = TEXTOS_AUTH.registro;

    const handleRegistroSubmit = (nombreCompleto: string, rol: 'cliente' | 'negocio') => {
        loginAction(nombreCompleto.trim(), rol);
        const rutaDestino = rol === 'negocio' ? '/(wizard)' : '/(tabs)';
        if (transicionRef.current) {
            transicionRef.current.iniciar(() => router.replace(rutaDestino as any));
        } else {
            router.replace(rutaDestino as any);
        }
    };

    const navegarLogin = () => router.replace('/login');

    return (
        <PlantillaAuth ref={transicionRef} subtituloLogo={textos.subtituloLogo} esRegistro={true}>
            <FormularioRegistro
                alHacerSubmit={handleRegistroSubmit}
                alNavegarLogin={navegarLogin}
            />
        </PlantillaAuth>
    );
};
