import { TransicionComidaRef } from '@/src/compartido/componentes/TransicionComida';
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

    const handleRegistroSubmit = (nombreCompleto: string) => {
        loginAction(nombreCompleto.trim());
        if (transicionRef.current) {
            transicionRef.current.iniciar(() => router.replace('/(tabs)'));
        } else {
            router.replace('/(tabs)');
        }
    };

    const navegarLogin = () => router.back();

    return (
        <PlantillaAuth ref={transicionRef} subtituloLogo={textos.subtituloLogo}>
            <FormularioRegistro
                alHacerSubmit={handleRegistroSubmit}
                alNavegarLogin={navegarLogin}
            />
        </PlantillaAuth>
    );
};
