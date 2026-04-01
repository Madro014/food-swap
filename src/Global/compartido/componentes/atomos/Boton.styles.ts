import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FF6B35',
        borderRadius: 9999,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#FF6B35',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Inter_700Bold',
    },
});