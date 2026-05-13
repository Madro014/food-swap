import React from 'react';
import { Modal, Text, TouchableOpacity, View, Image, Pressable } from 'react-native';
import { useAuthStore } from '@Global/funcionalidades/auth/useAuthStore';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './MenuPerfil.styles';

const iconosData: {id: string, url: string}[] = require('../../../../../assets/data/iconos.json');

interface MenuPerfilProps {
    visible: boolean;
    onClose: () => void;
}

export const MenuPerfil = ({ visible, onClose }: MenuPerfilProps) => {
    const { userName, userAvatar, rol, email, telefono, direccion, updateAvatar, alcanceKm, setAlcanceKm, fetchPerfil, logout } = useAuthStore();
    const prevVisibleRef = React.useRef(false);

    // Cargar perfil cuando el modal se abre (no en cada render)
    if (visible && !prevVisibleRef.current) {
        fetchPerfil();
    }
    prevVisibleRef.current = visible;

    const cambiarAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            const success = await updateAvatar(result.assets[0].uri);
            if (!success) {
                alert('No se pudo actualizar la foto de perfil. Inténtalo de nuevo.');
            }
        }
    };

    if (!visible) return null;

    // Dependiendo del rol, ajustamos las etiquetas
    const rolFormateado = rol === 'negocio' ? 'Establecimiento' : 'Cliente';

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable style={styles.menuContainer} onPress={(e) => e.stopPropagation()}>
                    <View style={styles.headerMenu}>
                        <View style={styles.avatarWrapper}>
                            <Image
                                source={{ uri: userAvatar || 'https://api.dicebear.com/7.x/notionists/png?seed=Felix&backgroundColor=f3f4f6' }}
                                style={styles.avatarGrande}
                            />
                            <TouchableOpacity style={styles.editAvatarBtn} onPress={cambiarAvatar}>
                                <Image 
                                    source={{ uri: iconosData.find(i => i.id === 'camara')?.url }} 
                                    style={styles.iconoEditAvatar} 
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headerTextInfo}>
                            <Text style={styles.userNameGrande}>{userName || 'Perfil'}</Text>
                            <View style={styles.badgeRol}>
                                <Text style={styles.textoBadgeRol}>{rolFormateado}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoSeccion}>
                        <Text style={styles.saludoTexto}>Información de la Cuenta</Text>
                        
                        {rol === 'negocio' ? (
                            <>
                                <View style={styles.filaInfo}>
                                    <Text style={styles.labelInfo}>Empresa:</Text>
                                    <Text style={styles.valorInfo}>{userName || 'No configurado'}</Text>
                                </View>
                                <View style={styles.filaInfo}>
                                    <Text style={styles.labelInfo}>Teléfono:</Text>
                                    <Text style={styles.valorInfo}>{telefono || 'No configurado'}</Text>
                                </View>
                                <View style={styles.filaInfo}>
                                    <Text style={styles.labelInfo}>Dirección:</Text>
                                    <Text style={styles.valorInfo}>{direccion || 'No configurada'}</Text>
                                </View>
                                <View style={styles.filaInfo}>
                                    <Text style={styles.labelInfo}>Correo:</Text>
                                    <Text style={styles.valorInfo}>{email || 'No configurado'}</Text>
                                </View>
                            </>
                        ) : (
                            <>
                                <View style={styles.filaInfo}>
                                    <Text style={styles.labelInfo}>Nombre:</Text>
                                    <Text style={styles.valorInfo}>{userName || 'No configurado'}</Text>
                                </View>
                                <View style={styles.filaInfo}>
                                    <Text style={styles.labelInfo}>Correo:</Text>
                                    <Text style={styles.valorInfo}>{email || 'No configurado'}</Text>
                                </View>
                                <View style={styles.distanciaContainer}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10}}>
                                        <Text style={styles.labelDistancia}>Alcance máximo</Text>
                                        <Text style={styles.valorDistancia}>{alcanceKm} km</Text>
                                    </View>
                                    <View style={styles.controlesDistancia}>
                                        <TouchableOpacity onPress={() => setAlcanceKm(Math.max(10, alcanceKm - 10))} style={styles.botonMenosMas}>
                                            <Text style={styles.textoMenosMas}>-</Text>
                                        </TouchableOpacity>
                                        <View style={styles.barraProcesoContenedor}>
                                            <View style={[styles.barraProcesoFill, { width: `${Math.min((alcanceKm / 500) * 100, 100)}%` }]} />
                                        </View>
                                        <TouchableOpacity onPress={() => setAlcanceKm(Math.min(500, alcanceKm + 10))} style={styles.botonMenosMas}>
                                            <Text style={styles.textoMenosMas}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.textoDistanciaInfo}>Recibirás sugerencias dentro de este radio.</Text>
                                </View>
                            </>
                        )}
                    </View>
                    
                    <View style={styles.divider} />

                    <TouchableOpacity 
                        style={[styles.cerrarMenuBtn, { backgroundColor: '#FFEEEDED', marginBottom: 12 }]} 
                        onPress={() => {
                            onClose();
                            logout();
                            // El router se manejará en el componente padre si es necesario, 
                            // pero como es un store, podemos forzar un reload o navegación
                        }}
                    >
                        <Text style={[styles.cerrarMenuTexto, { color: '#EF4444' }]}>Cerrar Sesión</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.cerrarMenuBtn} 
                        onPress={onClose}
                    >
                        <Text style={styles.cerrarMenuTexto}>Cerrar menú</Text>
                    </TouchableOpacity>
                </Pressable>
            </Pressable>
        </Modal>
    );
};
