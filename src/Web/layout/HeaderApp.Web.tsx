import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { MenuPerfil } from '@Global/compartido/componentes/organismos/MenuPerfil';
import { IconSymbol } from '@Global/components/ui/icon-symbol';
import { styles } from '@Global/compartido/componentes/organismos/HeaderApp.styles';

interface HeaderAppProps {
    userName: string | null;
    userAvatar: string | null;
    onLogout: () => void;
}

export function HeaderAppWeb({ userName, userAvatar, onLogout }: HeaderAppProps) {
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <>
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={{ uri: 'https://res.cloudinary.com/dzdgdqoap/image/upload/v1772550710/foodmatch_osnrsz.png' }}
                    style={styles.logoImage}
                    resizeMode="contain"
                />
                <Text style={styles.title}>FoodMatch Web</Text>
            </View>
            <View style={styles.userSection}>
                <TouchableOpacity style={styles.userProfile} onPress={() => setMenuVisible(true)}>
                    <Image
                        source={{ uri: userAvatar || 'https://api.dicebear.com/7.x/notionists/png?seed=Felix&backgroundColor=f3f4f6' }}
                        style={styles.avatar}
                    />
                    <Text style={styles.userName} numberOfLines={1}>{userName || 'Invitado'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
                    <IconSymbol name="rectangle.portrait.and.arrow.right" size={24} color="#FF6B35" />
                </TouchableOpacity>
            </View>
        </View>
        <MenuPerfil visible={menuVisible} onClose={() => setMenuVisible(false)} />
        </>
    );
}
