import { StyleSheet, Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export const styles = StyleSheet.create({
    // ── Mobile: tarjeta horizontal compacta ──
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#F8F5F2',
    },

    // ── Web: tarjeta vertical tipo "food card" ──
    cardWeb: {
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 0,
        overflow: 'hidden',
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.08,
        shadowRadius: 28,
        elevation: 10,
        borderWidth: 1,
        borderColor: '#F3F0ED',
    },

    // ── Imágenes ──
    image: {
        width: 100,
        height: 100,
        borderRadius: 18,
        backgroundColor: '#F3F0EE',
    },
    imageWeb: {
        width: '100%',
        height: 300, // Más alta
        borderRadius: 0,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },

    // ── Contenedor de info ──
    info: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center',
    },
    infoWeb: {
        marginLeft: 0,
        padding: 24, // Más padding
        paddingTop: 20,
    },

    // ── Textos ──
    nombre: {
        fontSize: 22, // Más grande
        fontWeight: '800',
        color: '#322E2B',
        marginBottom: 6,
        letterSpacing: -0.5,
    },
    restaurante: {
        fontSize: 14, // Más grande
        fontWeight: '700',
        color: '#FF6B35',
        marginBottom: 8,
    },
    distancia: {
        fontSize: 13, // Más grande
        color: '#8B7E74',
        fontWeight: '600',
    },

    // ── Botón mobile ──
    boton: {
        backgroundColor: '#FF6B35',
        width: 48,
        height: 48,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#FF6B35',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    botonIcono: {
        fontSize: 20,
    },

    // ── Botón web ──
    botonWeb: {
        backgroundColor: '#FF6B35',
        paddingVertical: 14,
        borderRadius: 14,
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#FF6B35',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 6,
        cursor: isWeb ? 'pointer' : 'auto',
    } as any,
    botonWebTexto: {
        color: '#FFFFFF',
        fontWeight: '800',
        fontSize: 14,
        letterSpacing: 0.3,
    },

    // ── Precio badge ──
    precioBadge: {
        position: 'absolute',
        top: 14,
        right: 14,
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    } as any,
    precioTexto: {
        color: '#FFFFFF',
        fontWeight: '800',
        fontSize: 14,
    },
});
