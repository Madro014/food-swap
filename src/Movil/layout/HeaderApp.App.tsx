import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { MenuPerfil } from '@Global/compartido/componentes/organismos/MenuPerfil';
import { IconSymbol } from '@Global/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import { styles } from '@Global/compartido/componentes/organismos/HeaderApp.styles';

interface HeaderAppProps {
    userName: string | null;
    userAvatar: string | null;
    onLogout: () => void;
}

export function HeaderAppApp({ userName, userAvatar, onLogout }: HeaderAppProps) {
    const [menuVisible, setMenuVisible] = useState(false);
    const router = useRouter();

    return (
        <>
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.logoContainer} 
                onPress={() => router.push('/(negocio)' as any)}
                activeOpacity={0.7}
            >
                <Image
                    source={{ uri: 'https://res.cloudinary.com/dzdgdqoap/image/upload/v1772550710/foodmatch_osnrsz.png' }}
                    style={styles.logoImage}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <View style={styles.userSection}>
                <TouchableOpacity style={styles.userProfile} onPress={() => setMenuVisible(true)}>
                    <Image
                        source={{ uri: userAvatar || 'https://api.dicebear.com/7.x/notionists/png?seed=Felix&backgroundColor=f3f4f6' }}
                        style={styles.avatar}
                    />
                    <Text style={styles.userName} numberOfLines={1}>{userName || 'Perfil'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
                    <IconSymbol name="rectangle.portrait.and.arrow.right" size={22} color="#FF6B35" />
                </TouchableOpacity>
            </View>
        </View>
        <MenuPerfil visible={menuVisible} onClose={() => setMenuVisible(false)} />
        </>
    );
}