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

    const handleRegistroSubmit = (data: {nombre: string, telefono: string, direccion: string, logo: string, email: string}, rol: 'cliente' | 'negocio') => {
        loginAction({
            name: data.nombre.trim(),
            rol: rol,
            avatar: data.logo,
            email: data.email,
            telefono: data.telefono,
            direccion: data.direccion
        });
        const rutaDestino = rol === 'negocio' ? '/(negocio)' : '/(tabs)';
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
