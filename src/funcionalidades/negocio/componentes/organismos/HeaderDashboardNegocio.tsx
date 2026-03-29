import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../../dashboard.styles';

interface HeaderDashboardNegocioProps {
    userName: string | null;
    userAvatar: string | null;
    onLogout: () => void;
}

export const HeaderDashboardNegocio = ({ userName, userAvatar, onLogout }: HeaderDashboardNegocioProps) => {
    return (
        <View style={styles.header}>
            <View style={styles.infoUsuario}>
                {userAvatar && <Image source={{ uri: userAvatar }} style={styles.avatar} />}
                <View>
                    <Text style={styles.saludo}>Bienvenido de vuelta,</Text>
                    <Text style={styles.nombre}>{userName}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={onLogout} style={styles.botonSalir}>
                <Text style={styles.textoBotonSalir}>Salir</Text>
            </TouchableOpacity>
        </View>
    );
};
