import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    selectorContenedor: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#f0e6e1',
        borderRadius: 9999,
        padding: 4,
    },
    botonRol: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 9999,
    },
    botonRolActivo: {
        backgroundColor: '#ffffff',
        boxShadow: '0px 2px 4px rgba(50, 46, 43, 0.08)',
    },
    textoRol: {
        fontSize: 14,
        fontWeight: '500',
        color: '#605a57',
    },
    textoRolActivo: {
        color: '#322e2b',
        fontWeight: 'bold',
    },
    labelLogo: {
        fontSize: 14,
        fontWeight: '600',
        color: '#322e2b',
        marginBottom: 8,
        marginTop: 4,
    },
    botonLogo: {
        backgroundColor: '#f0e6e1',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#d2c9c4',
        borderStyle: 'dashed',
    },
    textoBotonLogo: {
        color: '#605a57',
        fontWeight: '500',
    },
    textoRutaLogo: {
        fontSize: 12,
        color: '#7b726d',
        marginBottom: 16,
        fontStyle: 'italic',
    },
    previewContainer: {
        alignItems: 'center',
        marginBottom: 16,
        gap: 8,
    },
    previewImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#f0e6e1',
    },
    botonCambiarLogo: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: '#fef5f0',
        borderWidth: 1,
        borderColor: '#FFE5D9',
    },
    textoBotonCambiarLogo: {
        fontSize: 12,
        color: '#FF6B35',
        fontWeight: 'bold',
    },
    textoError: {
        color: '#c0392b',
        fontSize: 13,
        marginBottom: 8,
        textAlign: 'center',
    },
});
