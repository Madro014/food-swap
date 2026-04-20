import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    tarjetaFormulario: {
        width: '100%',
        maxWidth: 440, // Slightly narrower
        alignSelf: 'center',
        padding: 24, // Reduced from 28
        paddingTop: 16, // Reduced from 20
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        borderRadius: 24, // Slightly less round for compactness
        shadowColor: 'rgba(30, 20, 10, 0.25)',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.2,
        shadowRadius: 40,
        elevation: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.6)',
        ...(Platform.OS === 'web' && {
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
        }),
    },

    // ── Header decorativo ──
    headerDecoativo: {
        alignItems: 'center',
        marginBottom: 12, // Reduced from 20
    },
    emojiBadge: {
        width: 44, // Reduced from 56
        height: 44, // Reduced from 56
        borderRadius: 14,
        backgroundColor: '#FFF3ED',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8, // Reduced from 12
        shadowColor: '#FF6B35',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 3,
    },
    emojiTexto: {
        fontSize: 28,
    },
    titulo: {
        fontSize: 24,
        fontFamily: 'Roboto_700Bold',
        fontWeight: '700',
        color: '#1A1715',
        textAlign: 'center',
        marginBottom: 4,
        letterSpacing: -0.3,
    },
    subtitulo: {
        fontSize: 13,
        fontFamily: 'Roboto_400Regular',
        color: '#9E9490',
        textAlign: 'center',
        fontWeight: '400',
        lineHeight: 18,
    },

    // ── Separador ──
    separador: {
        height: 1,
        backgroundColor: '#F0EBE7',
        marginVertical: 12, // Reduced from 18
        marginHorizontal: 8,
    },

    // ── Labels ──
    label: {
        fontSize: 11,
        fontFamily: 'Roboto_700Bold',
        fontWeight: '700',
        color: '#8B7E74',
        marginBottom: 6,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    labelImagen: {
        fontSize: 11,
        fontFamily: 'Roboto_700Bold',
        fontWeight: '700',
        color: '#8B7E74',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        marginTop: 2,
    },

    // ── Inputs ──
    filaInputs: {
        flexDirection: 'column',
        alignItems: 'stretch',
    },

    // ── Image picker ──
    botonImagen: {
        width: '100%',
        height: 110, // Significantly reduced from 150
        backgroundColor: '#FFF8F5',
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#FFDDD0',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginBottom: 12,
    },
    imagenPreview: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    iconoCarga: {
        width: 80,
        height: 80,
        marginBottom: 12,
        resizeMode: 'contain',
        opacity: 0.8,
    },
    placeholderImagenContenedor: {
        alignItems: 'center',
        padding: 16,
    },
    textoPlaceholder: {
        color: '#6B5E55',
        fontFamily: 'Roboto_700Bold',
        fontSize: 14,
        fontWeight: '700',
        marginTop: 8,
    },
    textoPista: {
        color: '#A89E96',
        fontFamily: 'Roboto_400Regular',
        fontSize: 11,
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 4,
    },
    botonOverlay: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        backgroundColor: 'rgba(255, 107, 53, 0.92)',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        shadowColor: '#FF6B35',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },
    textoBotonOverlay: {
        color: '#FFFFFF',
        fontFamily: 'Roboto_700Bold',
        fontSize: 12,
        fontWeight: 'bold',
    },

    // ── Descripción ──
    inputDescripcion: {
        marginTop: 2,
    },
    areaTexto: {
        minHeight: 70, // Reduced from 90
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
        color: '#322E2B',
        fontFamily: 'Roboto_400Regular',
        fontSize: 14,
        borderWidth: 1.5,
        borderColor: '#F0EBE7',
        textAlignVertical: 'top',
    },
    contadorCaracteres: {
        fontSize: 10,
        fontFamily: 'Roboto_500Medium',
        color: '#B0A8A0',
        textAlign: 'right',
        marginTop: 4,
        fontWeight: '500',
    },

    // ── Errores ──
    textoError: {
        color: '#D93545',
        fontFamily: 'Roboto_700Bold',
        fontSize: 11,
        fontWeight: '600',
        marginTop: 4,
        marginLeft: 2,
    },

    // ── Botones ──
    botonesContenedor: {
        marginTop: 8, // Reduced from 12
        gap: 8, // Reduced from 10
    },
    botonCancelar: {
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textoCancelar: {
        color: '#9E9490',
        fontFamily: 'Roboto_500Medium',
        fontSize: 14,
        fontWeight: '500',
        textDecorationLine: 'underline',
    },
});