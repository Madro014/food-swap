import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MenuPerfil } from '@Global/compartido/componentes/organismos/MenuPerfil';
import { styles } from '../../dashboard.styles';

interface HeaderDashboardNegocioProps {
    userName: string | null;
    userAvatar: string | null;
    onLogout: () => void;
}

export const HeaderDashboardNegocio = ({ userName, userAvatar, onLogout }: HeaderDashboardNegocioProps) => {
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <>
        <View style={styles.header}>
            <TouchableOpacity style={styles.infoUsuario} onPress={() => setMenuVisible(true)}>
                {userAvatar && <Image source={{ uri: userAvatar }} style={styles.avatar} />}
                <View>
                    <Text style={styles.saludo}>Bienvenido de vuelta,</Text>
                    <Text style={styles.nombre}>{userName}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onLogout} style={styles.botonSalir}>
                <Text style={styles.textoBotonSalir}>Salir</Text>
            </TouchableOpacity>
        </View>
        <MenuPerfil visible={menuVisible} onClose={() => setMenuVisible(false)} />
        </>
    );
};
