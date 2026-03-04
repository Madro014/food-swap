import { SymbolView } from 'expo-symbols';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './HeaderApp.styles';

interface HeaderAppProps {
    userName: string | null;
    userAvatar: string | null;
    onLogout: () => void;
}

export function HeaderApp({ userName, userAvatar, onLogout }: HeaderAppProps) {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={{ uri: 'https://res.cloudinary.com/dzdgdqoap/image/upload/v1772550710/foodmatch_osnrsz.png' }}
                    style={styles.logoImage}
                    resizeMode="contain"
                />
                <Text style={styles.title}>FoodMatch</Text>
            </View>
            <View style={styles.userSection}>
                <View style={styles.userProfile}>
                    <Image
                        source={{ uri: userAvatar || 'https://api.dicebear.com/7.x/notionists/png?seed=Felix&backgroundColor=f3f4f6' }}
                        style={styles.avatar}
                    />
                    <Text style={styles.userName} numberOfLines={1}>{userName || 'Invitado'}</Text>
                </View>
                <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
                    <SymbolView name="rectangle.portrait.and.arrow.right" size={20} tintColor="#FF6B6B" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
