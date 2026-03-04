import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 12,
        marginBottom: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 15,
    },
    info: {
        flex: 1,
    },
    nombre: {
        fontSize: 18,
        fontWeight: '700',
        color: '#343A40',
        fontFamily: 'Inter_700Bold',
        marginBottom: 4,
    },
    restaurante: {
        fontSize: 14,
        color: '#868E96',
        fontFamily: 'Inter_400Regular',
    },
    boton: {
        backgroundColor: '#FF6B6B',
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    botonIcono: {
        fontSize: 18,
    },
});
