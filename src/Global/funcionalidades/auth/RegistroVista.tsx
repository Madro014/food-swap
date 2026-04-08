import { TransicionComidaRef } from '@Global/compartido/componentes/TransicionComida';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { pedirPermisosUbicacion } from '@backend/UbicacionServicio';
import { FormularioRegistro } from './componentes/organismos/FormularioRegistro';
import { PlantillaAuth } from './componentes/plantillas/PlantillaAuth';
import { TEXTOS_AUTH } from './constantes/textos';
import { useAuthStore } from './useAuthStore';

export const RegistroVista = () => {
    const router = useRouter();
    const registroUsuario = useAuthStore(state => state.registroUsuario);
    const registroNegocio = useAuthStore(state => state.registroNegocio);
    const transicionRef = useRef<TransicionComidaRef>(null);
    const textos = TEXTOS_AUTH.registro;

    const handleRegistroSubmit = async (
        data: { nombre: string; telefono: string; direccion: string; logo: string; email: string; password: string },
        rol: 'cliente' | 'negocio',
    ) => {
        let ok = false;

        if (rol === 'negocio') {
            // Intentar obtener ubicación GPS — si falla, usar 0,0 como placeholder
            const ubi = await pedirPermisosUbicacion();
            ok = await registroNegocio(
                { nombreEmpresa: data.nombre, email: data.email, contrasena: data.password, telefono: data.telefono },
                { latitud: ubi?.latitud ?? 0, longitud: ubi?.longitud ?? 0, direccionFisica: data.direccion },
            );
        } else {
            ok = await registroUsuario(data.nombre, data.email, data.password, data.telefono || undefined);
        }

        if (!ok) return; // El store guarda el errorAuth para mostrarlo en el form

        // Tras registro exitoso, llevar al login para que el usuario ingrese credenciales
        if (transicionRef.current) {
            transicionRef.current.iniciar(() => router.replace('/login' as any));
        } else {
            router.replace('/login' as any);
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
