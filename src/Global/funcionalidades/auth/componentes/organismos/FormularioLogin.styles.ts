import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    selectorContenedor: {
        flexDirection: 'row',
        marginBottom: 24,
        backgroundColor: '#f0e6e1',
        borderRadius: 9999,
        padding: 4,
    },
    botonRol: {
        flex: 1,
        paddingVertical: Platform.OS === 'web' ? 14 : 10,
        alignItems: 'center',
        borderRadius: 9999,
    },
    botonRolActivo: {
        backgroundColor: '#ffffff',
        ...Platform.select({
            web: { boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)' },
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
            android: { elevation: 2 }
        })
    },
    textoRol: {
        fontSize: Platform.OS === 'web' ? 15 : 14,
        fontWeight: '600',
        color: '#605a57',
        fontFamily: 'Inter_600SemiBold',
    },
    textoRolActivo: {
        color: '#110e0b',
        fontWeight: '700',
    },
    textoError: {
        color: '#c0392b',
        fontSize: 13,
        marginBottom: 8,
        textAlign: 'center',
    },
});
