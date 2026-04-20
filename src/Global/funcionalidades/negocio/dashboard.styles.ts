import { StyleSheet, Platform, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
    contenedorPadre: {
        flex: 1,
        backgroundColor: '#FBF9F6', // Zest & Hearth warm background
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    contenedorContenido: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 24,
    },
    cabeceraLista: {
        marginBottom: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    tituloSeccion: {
        fontSize: 24,
        fontWeight: '800',
        color: '#322E2B',
        letterSpacing: -0.5,
    },
    subtituloSeccion: {
        fontSize: 13,
        color: '#8B7E74',
        fontWeight: '600',
        backgroundColor: '#F1EBE5',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        overflow: 'hidden',
    },
    estadoVacio: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    textoVacio: {
        fontSize: 16,
        color: '#8B7E74',
        textAlign: 'center',
        lineHeight: 24,
    },
    listaPlatos: {
        paddingBottom: 110,
    },
    columnaGrid: {
        justifyContent: 'space-between',
        paddingHorizontal: 4,
    },
    tarjetaPlato: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        marginBottom: 20,
        width: '48%', // Approx half the width for 2 columns
        shadowColor: '#322E2B',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 6,
        borderWidth: 1,
        borderColor: 'rgba(241, 235, 229, 0.4)',
        overflow: 'hidden',
    },
    imagenPlato: {
        width: '100%',
        height: 160, // Adjusted for grid aspect ratio
        backgroundColor: '#F1F5F9',
    },
    overlayImagen: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.02)',
    },
    overlayEdit: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(230, 57, 70, 0.85)', // Theme red with opacity
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoEditOverlay: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 8,
    },
    infoPlato: {
        padding: 14,
    },
    etiquetaEmpresa: {
        fontSize: 11,
        color: '##ff6b35',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    tituloPlato: {
        fontSize: 16, // Adjusted for grid
        fontWeight: '700',
        color: '#322E2B',
        marginBottom: 2,
    },
    textoRestaurante: {
        fontSize: 15,
        color: '#8B7E74',
        fontWeight: '500',
    },
    botonEliminar: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
        backgroundColor: 'transparent',
    },
    botonSubir: {
        backgroundColor: '#ff6b35',
        flexDirection: 'row',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#ff6b35',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 15,
        elevation: 10,
    },
    textoBotonSubir: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 10,
    },

    // ── Modal del formulario ──
    modalOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(30, 20, 10, 0.55)',
    },
    modalKeyboard: {
        flex: 1,
        justifyContent: 'flex-end',
        pointerEvents: 'box-none' as any,
    },
    modalContenedor: {
        backgroundColor: '#FF7E40',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        maxHeight: '92%',
        paddingBottom: Platform.OS === 'ios' ? 34 : 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -8 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 20,
    },
    modalScroll: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 120, // Espacio para el navbar
    },
});
