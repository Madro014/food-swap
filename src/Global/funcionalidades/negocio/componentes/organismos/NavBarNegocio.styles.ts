import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    navBar: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 35,
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 15,
        width: Platform.OS === 'web' ? 500 : '90%',
        height: Platform.OS === 'web' ? 80 : 70,
        alignItems: 'center',
        justifyContent: 'space-around',
        shadowColor: '#FF6B35',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.1,
        shadowRadius: 30,
        elevation: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 107, 53, 0.1)',
        ...(Platform.OS === 'web' && {
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
        }),
    },

    // ── Tab item (igual al cliente: icono + texto, sin fondo) ──
    navItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        gap: 6,
        flex: 1,
    },
    navItemPressed: {
        opacity: 0.7,
        transform: [{ scale: 0.96 }],
    },
    navText: {
        fontSize: 14,
        fontFamily: 'Roboto_700Bold',
        color: '#B3ACA7',  // Inactivo: gris claro (igual al cliente)
        fontWeight: '700',
    },
    navTextActive: {
        color: '#FF6B35', // Activo: naranja de marca
    },

    // ── Separador vertical entre tabs ──
    separador: {
        width: 1,
        height: 28,
        backgroundColor: 'rgba(0,0,0,0.06)',
    },

    // ── Botón Publicar: versión activa (cuando está en esa pantalla usa mismo estilo que "Descubrir" activo) ──
    // Este estilo extra solo aplica cuando está completamente inactivo (como un tab más)
    btnPublicarTab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        gap: 6,
        flex: 1,
    },
});
