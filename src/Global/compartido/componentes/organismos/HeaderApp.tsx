import React from 'react';
import { Platform } from 'react-native';
import { HeaderAppWeb } from '@Web/layout/HeaderApp.Web';
import { HeaderAppApp } from '@APP/layout/HeaderApp.App';

interface HeaderAppProps {
    userName: string | null;
    userAvatar: string | null;
    onLogout: () => void;
}

export function HeaderApp(props: HeaderAppProps) {
    if (Platform.OS === 'web') {
        return <HeaderAppWeb {...props} />;
    }

    return <HeaderAppApp {...props} />;
}
