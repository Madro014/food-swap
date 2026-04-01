import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    contenedorPadre: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    contenedor: {
        flex: 1,
        padding: 24,
    },
    header: {
        marginBottom: 32,
        marginTop: 20
    },
    textoPaso: {
        fontSize: 14,
        color: '#64748b',
        marginBottom: 8,
        fontWeight: 'bold',
    },
    barraProgreso: {
        height: 6,
        backgroundColor: '#e2e8f0',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progresoActivo: {
        height: '100%',
        backgroundColor: '#ff4d4f',
    },
    contenidoPaso: {
        flex: 1,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0f172a',
        marginBottom: 24,
    },
    botonImagen: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#f1f5f9',
        borderWidth: 2,
        borderColor: '#e2e8f0',
        borderStyle: 'dashed',
    },
    imagenPreview: {
        width: '100%',
        height: '100%',
    },
    placeholderImagen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoPlaceholderImagen: {
        color: '#64748b',
        fontWeight: 'bold',
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
    },
    botonControl: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 120,
    },
    botonAtras: {
        backgroundColor: '#f1f5f9',
    },
    textoBotonAtras: {
        color: '#64748b',
        fontWeight: 'bold',
    },
    botonSiguiente: {
        backgroundColor: '#ff4d4f',
        marginLeft: 'auto'
    },
    botonDeshabilitado: {
        backgroundColor: '#cbd5e1',
        opacity: 0.7,
    },
    textoBotonSiguiente: {
        color: 'white',
        fontWeight: 'bold',
    }
});
