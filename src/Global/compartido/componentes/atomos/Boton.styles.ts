import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FF6B35',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#FF6B35',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 6,
        ...(Platform.OS === 'web' && {
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        }),
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        fontFamily: 'Roboto_700Bold',
        letterSpacing: 0.3,
    }
});
