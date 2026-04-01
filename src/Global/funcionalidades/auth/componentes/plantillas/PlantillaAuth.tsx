import React, { forwardRef } from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import { PlantillaAuthWeb } from '@Web/auth/PlantillaAuth.Web';
import { PlantillaAuthApp } from '@APP/auth/PlantillaAuth.App';
import { TransicionComidaRef } from '@Global/compartido/componentes/TransicionComida';

interface PlantillaAuthProps {
    subtituloLogo: string;
    children: React.ReactNode;
    esRegistro?: boolean;
}

export const PlantillaAuth = forwardRef<TransicionComidaRef, PlantillaAuthProps>(
    (props, ref) => {
        const { width } = useWindowDimensions();
        const isDesktop = width > 768;

        if (Platform.OS === 'web' || isDesktop) {
            return <PlantillaAuthWeb {...props} ref={ref} />;
        }

        return <PlantillaAuthApp {...props} ref={ref} />;
    }
);

PlantillaAuth.displayName = 'PlantillaAuth';