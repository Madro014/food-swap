import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { MenuPerfil } from '@Global/compartido/componentes/organismos/MenuPerfil';
import { IconSymbol } from '@Global/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import { styles } from '@Global/compartido/componentes/organismos/HeaderApp.styles';

interface HeaderAppProps {
    userName: string | null;
    userAvatar: string | null;
    onLogout: () => void;
}

export function HeaderAppWeb({ userName, userAvatar, onLogout }: HeaderAppProps) {
    const [menuVisible, setMenuVisible] = useState(false);
    const router = useRouter();
    const { width } = useWindowDimensions();
    const isSmall = width < 600;

    return (
        <>
        <View style={isSmall ? [styles.container, styles.containerSmall] : styles.container}>
            <TouchableOpacity 
                style={styles.logoContainer} 
                onPress={() => router.push('/(negocio)' as any)}
                activeOpacity={0.7}
            >
                <Image
                    source={{ uri: 'https://res.cloudinary.com/dzdgdqoap/image/upload/v1772550710/foodmatch_osnrsz.png' }}
                    style={isSmall ? [styles.logoImage, styles.logoImageSmall] : styles.logoImage}
                    resizeMode="contain"
                />
                <View>
                    <Text style={isSmall ? [styles.title, styles.titleSmall] : styles.title}>Food Swap</Text>
                    {!isSmall && <Text style={{ fontSize: 12, color: '#8B7E74', fontWeight: '500', marginTop: -2 }}>Elige y come</Text>}
                </View>
            </TouchableOpacity>
            <View style={styles.userSection}>
                <TouchableOpacity style={isSmall ? [styles.userProfile, styles.userProfileSmall] : styles.userProfile} onPress={() => setMenuVisible(true)}>
                    <Image
                        source={{ uri: userAvatar || 'https://api.dicebear.com/7.x/notionists/png?seed=Felix&backgroundColor=f3f4f6' }}
                        style={isSmall ? [styles.avatar, styles.avatarSmall] : styles.avatar}
                    />
                    {!isSmall && <Text style={styles.userName} numberOfLines={1}>{userName || 'Invitado'}</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={isSmall ? [styles.logoutButton, styles.logoutButtonSmall] : styles.logoutButton} onPress={onLogout}>
                    <IconSymbol name="rectangle.portrait.and.arrow.right" size={isSmall ? 20 : 24} color="#FF6B35" />
                </TouchableOpacity>
            </View>
        </View>
        <MenuPerfil visible={menuVisible} onClose={() => setMenuVisible(false)} />
        </>
    );
}
