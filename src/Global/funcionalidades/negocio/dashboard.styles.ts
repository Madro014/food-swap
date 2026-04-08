import { StyleSheet, Platform, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
    contenedorPadre: {
        flex: 1,
        backgroundColor: '#fafafa',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        padding: 24,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoUsuario: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
        backgroundColor: '#f1f5f9'
    },
    saludo: {
        fontSize: 14,
        color: '#64748b',
    },
    nombre: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0f172a',
    },
    botonSalir: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#f1f5f9',
        borderRadius: 8,
    },
    textoBotonSalir: {
        color: '#ff4d4f',
        fontWeight: 'bold',
        fontSize: 14,
    },
    contenedorContenido: {
        flex: 1,
        padding: 24,
    },
    cabeceraLista: {
        marginBottom: 20,
    },
    tituloSeccion: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0f172a',
    },
    subtituloSeccion: {
        fontSize: 14,
        color: '#64748b',
        marginTop: 4,
    },
    estadoVacio: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoVacio: {
        fontSize: 16,
        color: '#94a3b8',
    },
    listaPlatos: {
        paddingBottom: 20,
    },
    tarjetaPlato: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    imagenPlato: {
        width: '100%',
        height: 200,
        backgroundColor: '#f1f5f9',
    },
    infoPlato: {
        padding: 20,
        flex: 1,
    },
    tituloPlato: {
        fontSize: 20,
        fontWeight: '700',
        color: '#322E2B',
        marginBottom: 6,
    },
    textoRestaurante: {
        fontSize: 14,
        color: '#8B7E74',
        fontWeight: '500',
    },
    botonEliminar: {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    footer: {
        padding: 24,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    botonSubir: {
        backgroundColor: '#ff4d4f',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#ff4d4f',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    textoBotonSubir: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
