import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { IconSymbol } from '@Global/components/ui/icon-symbol';
import { useRouter, usePathname } from 'expo-router';
import { styles } from './NavBarNegocio.styles';

interface NavBarNegocioProps {
    onPublicarPress?: () => void;
}

export const NavBarNegocio = ({ onPublicarPress }: NavBarNegocioProps) => {
    const router = useRouter();
    const pathname = usePathname();

    // Determina la pestaña activa basándonos en la ruta real
    const getActiveTab = () => {
        if (pathname.includes('crear-plato')) return 'publicar';
        return 'misPlatos'; // Default
    };

    const [activeTab, setActiveTab] = useState<'misPlatos' | 'publicar'>(() => getActiveTab());

    // Sincronizar con cambios de ruta (por ejemplo, si navegan con el botón atrás)
    useEffect(() => {
        setActiveTab(pathname.includes('crear-plato') ? 'publicar' : 'misPlatos');
    }, [pathname]);

    const handleMisPlatos = () => {
        setActiveTab('misPlatos');
        router.push('/(negocio)' as any);
    };

    const handlePublicar = () => {
        setActiveTab('publicar');
        if (onPublicarPress) {
            onPublicarPress();
        } else {
            router.push('/crear-plato' as any);
        }
    };

    const isMisPlatos = activeTab === 'misPlatos';
    const isPublicar = activeTab === 'publicar';

    return (
        <View style={styles.container}>
            <View style={styles.navBar}>

                {/* ── Tab: Mis Platos ── */}
                <Pressable
                    style={({ pressed }) => [
                        styles.navItem,
                        pressed && styles.navItemPressed,
                    ]}
                    onPress={handleMisPlatos}
                >
                    <IconSymbol
                        name="square.grid.2x2.fill"
                        size={28}
                        color={isMisPlatos ? '#FF6B35' : '#B3ACA7'}
                    />
                    <Text style={[styles.navText, isMisPlatos && styles.navTextActive]}>
                        Mis Platos
                    </Text>
                </Pressable>

                {/* ── Divider ── */}
                <View style={styles.separador} />

                {/* ── Tab: Publicar ── */}
                <Pressable
                    style={({ pressed }) => [
                        styles.btnPublicarTab,
                        pressed && styles.navItemPressed,
                    ]}
                    onPress={handlePublicar}
                >
                    <IconSymbol
                        name="plus.circle.fill"
                        size={28}
                        color={isPublicar ? '#FF6B35' : '#B3ACA7'}
                    />
                    <Text style={[styles.navText, isPublicar && styles.navTextActive]}>
                        Publicar
                    </Text>
                </Pressable>

            </View>
        </View>
    );
};
