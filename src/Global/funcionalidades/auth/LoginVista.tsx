import { TransicionComidaRef } from '@Global/compartido/componentes/TransicionComida';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { FormularioLogin } from './componentes/organismos/FormularioLogin';
import { PlantillaAuth } from './componentes/plantillas/PlantillaAuth';
import { TEXTOS_AUTH } from './constantes/textos';
import { useAuthStore } from './useAuthStore';

export const LoginVista = () => {
    const router = useRouter();
    const loginAction = useAuthStore(state => state.login);
    const transicionRef = useRef<TransicionComidaRef>(null);
    const textos = TEXTOS_AUTH.login;

    const handleLoginSubmit = (email: string, rol: 'cliente' | 'negocio') => {
        loginAction({
            name: email.split('@')[0], 
            rol: rol,
            email: email
        });
        const rutaDestino = rol === 'negocio' ? '/(negocio)' : '/(tabs)';
        if (transicionRef.current) {
            transicionRef.current.iniciar(() => router.replace(rutaDestino as any));
        } else {
            router.replace(rutaDestino as any);
        }
    };

    const navegarRegistro = () => router.replace('/registro');

    return (
        <PlantillaAuth ref={transicionRef} subtituloLogo={textos.subtituloLogo} esRegistro={false}>
            <FormularioLogin
                alHacerSubmit={handleLoginSubmit}
                alNavegarRegistro={navegarRegistro}
            />
        </PlantillaAuth>
    );
};
