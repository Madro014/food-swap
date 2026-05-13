import React, { forwardRef, useMemo, useRef } from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import { PlantillaAuthWeb } from '@Web/auth/PlantillaAuth.Web';
import { PlantillaAuthApp } from '@Movil/auth/PlantillaAuth.App';
import { TransicionComidaRef } from '@Global/compartido/componentes/TransicionComida';

interface PlantillaAuthProps {
    subtituloLogo: string;
    children: React.ReactNode;
    esRegistro?: boolean;
}

export const PlantillaAuth = forwardRef<TransicionComidaRef, PlantillaAuthProps>(
    (props, ref) => {
        const { width: SCREEN_WIDTH } = useWindowDimensions();
        // Guardamos el valor inicial para evitar que el teclado en Android
        // cambie el layout y reinicie el formulario.
        const initialWidthRef = useRef(SCREEN_WIDTH);
        const isDesktop = useMemo(() => {
            return Platform.OS === 'web' || initialWidthRef.current > 768;
        }, []);

        if (isDesktop) {
            return <PlantillaAuthWeb {...props} ref={ref} />;
        }

        return <PlantillaAuthApp {...props} ref={ref} />;
    }
);

PlantillaAuth.displayName = 'PlantillaAuth';