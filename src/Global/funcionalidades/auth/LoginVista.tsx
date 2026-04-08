import { TransicionComidaRef } from '@Global/compartido/componentes/TransicionComida';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { FormularioLogin } from './componentes/organismos/FormularioLogin';
import { PlantillaAuth } from './componentes/plantillas/PlantillaAuth';
import { TEXTOS_AUTH } from './constantes/textos';
import { useAuthStore } from './useAuthStore';

export const LoginVista = () => {
    const router = useRouter();
    const loginUsuario = useAuthStore(state => state.loginUsuario);
    const loginNegocio = useAuthStore(state => state.loginNegocio);
    const transicionRef = useRef<TransicionComidaRef>(null);
    const textos = TEXTOS_AUTH.login;

    const handleLoginSubmit = async (email: string, password: string, rol: 'cliente' | 'negocio') => {
        const loginFn = rol === 'negocio' ? loginNegocio : loginUsuario;
        const ok = await loginFn(email, password);

        if (!ok) return; // El store ya guarda el errorAuth para mostrarlo en el form

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
