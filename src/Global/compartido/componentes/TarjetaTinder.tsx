import React from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import { TarjetaTinderWeb } from '@Web/platos/TarjetaTinder.Web';
import { TarjetaTinderApp } from '@Movil/platos/TarjetaTinder.App';
import { PlatoType } from '@Global/funcionalidades/matches/useMatchesStore';

interface TarjetaDeComidaProps {
    plato: PlatoType;
    alAceptar: (plato: PlatoType) => void;
    alRechazar: (plato: PlatoType) => void;
}

export default function TarjetaDeComida(props: TarjetaDeComidaProps) {
    const { width } = useWindowDimensions();
    const isDesktop = width > 768;

    if (Platform.OS === 'web' || isDesktop) {
        return <TarjetaTinderWeb {...props} />;
    }

    return <TarjetaTinderApp {...props} />;
}