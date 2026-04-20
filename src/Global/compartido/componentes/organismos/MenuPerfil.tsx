import React, { useEffect } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, Image, Platform, Pressable } from 'react-native';
import { useAuthStore } from '@Global/funcionalidades/auth/useAuthStore';
import { IconSymbol } from '@Global/components/ui/icon-symbol';
import * as ImagePicker from 'expo-image-picker';

const iconosData: Array<{id: string, url: string}> = require('../../../../../assets/data/iconos.json');

interface MenuPerfilProps {
    visible: boolean;
    onClose: () => void;
}

export const MenuPerfil = ({ visible, onClose }: MenuPerfilProps) => {
    const { userName, userAvatar, rol, email, telefono, direccion, updateAvatar, alcanceKm, setAlcanceKm, fetchPerfil } = useAuthStore();

    useEffect(() => {
        if (visible) {
            fetchPerfil();
        }
    }, [visible]);

    const cambiarAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            updateAvatar(result.assets[0].uri);
        }
    };

    if (!visible) return null;

    // Dependiendo del rol, ajustamos las etiquetas
    const rolFormateado = rol === 'negocio' ? 'Establecimiento' : 'Cliente';
    const saludo = rol === 'negocio' ? 'Bienvenido a tu panel de control.' : '¡Qué bueno verte por aquí!';

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
                                            <View style={[styles.barraProcesoFill, { width: `${Math.min((alcanceKm / 200) * 100, 100)}%` }]} />
                                        </View>
                                        <TouchableOpacity onPress={() => setAlcanceKm(Math.min(200, alcanceKm + 10))} style={styles.botonMenosMas}>
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

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    menuContainer: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
        ...(Platform.OS === 'web' && { cursor: 'default' as any }),
    },
    headerMenu: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    avatarWrapper: {
        position: 'relative',
    },
    avatarGrande: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#f3f4f6',
    },
    editAvatarBtn: {
        position: 'absolute',
        bottom: -4,
        right: -4,
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconoEditAvatar: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
    },
    headerTextInfo: {
        flex: 1,
        alignItems: 'flex-start',
    },
    userNameGrande: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#322e2b',
        fontFamily: 'Inter_700Bold',
        marginBottom: 4,
    },
    badgeRol: {
        backgroundColor: '#f0e6e1',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
    },
    textoBadgeRol: {
        fontSize: 12,
        fontWeight: '600',
        color: '#FF6B35',
        fontFamily: 'Inter_600SemiBold',
    },
    divider: {
        height: 1,
        backgroundColor: '#f0e6e1',
        marginVertical: 20,
    },
    infoSeccion: {
        paddingVertical: 10,
    },
    saludoTexto: {
        fontSize: 16,
        fontWeight: '600',
        color: '#322e2b',
        marginBottom: 8,
    },
    descripcionTexto: {
        fontSize: 14,
        color: '#605a57',
        lineHeight: 22,
    },
    filaInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f7f2ef',
    },
    labelInfo: {
        width: 80,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#322e2b',
    },
    valorInfo: {
        flex: 1,
        fontSize: 14,
        color: '#605a57',
    },
    cerrarMenuBtn: {
        backgroundColor: '#FF6B35',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    cerrarMenuTexto: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    distanciaContainer: {
        marginTop: 16,
        padding: 16,
        backgroundColor: '#fef5f0',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#FFE5D9',
    },
    labelDistancia: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#322e2b',
    },
    valorDistancia: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF6B35',
    },
    controlesDistancia: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    botonMenosMas: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    textoMenosMas: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF6B35',
        marginTop: -2,
    },
    barraProcesoContenedor: {
        flex: 1,
        height: 8,
        backgroundColor: '#FFE5D9',
        borderRadius: 4,
        overflow: 'hidden',
    },
    barraProcesoFill: {
        height: '100%',
        backgroundColor: '#FF6B35',
        borderRadius: 4,
    },
    textoDistanciaInfo: {
        fontSize: 12,
        color: '#7b726d',
        marginTop: 10,
        textAlign: 'center',
    }
});
