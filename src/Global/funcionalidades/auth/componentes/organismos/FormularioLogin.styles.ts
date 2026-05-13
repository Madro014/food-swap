import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    selectorContenedor: {
        flexDirection: 'row',
        marginBottom: 32,
        backgroundColor: 'rgba(255, 107, 53, 0.05)', // Brand-tinted background
        borderRadius: 20,
        padding: 6,
        borderWidth: 1,
        borderColor: 'rgba(255, 107, 53, 0.1)',
    },
    botonRol: {
        flex: 1,
        paddingVertical: Platform.OS === 'web' ? 14 : 12,
        alignItems: 'center',
        borderRadius: 12,
    },
    botonRolActivo: {
        backgroundColor: '#ffffff',
        ...Platform.select({
            web: { boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' },
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 8 },
            android: { elevation: 4 }
        })
    },
    textoRol: {
        fontSize: Platform.OS === 'web' ? 16 : 15, // Slightly larger
        fontWeight: '600',
        color: '#868e96', // Modern gray
        fontFamily: 'Inter_600SemiBold',
    },
    textoRolActivo: {
        color: '#FF6B35', // Use brand color for active state
        fontWeight: '700',
        fontFamily: 'Inter_700Bold',
    },
    textoError: {
        color: '#e03131', // Brighter, modern red
        fontSize: 14,
        marginTop: -8, // Pull closer to inputs
        marginBottom: 16,
        textAlign: 'center',
        fontFamily: 'Inter_500Medium',
    },
});
