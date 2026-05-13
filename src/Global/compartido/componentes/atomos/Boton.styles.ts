import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FF6B35',
        paddingVertical: Platform.OS === 'web' ? 18 : 16,
        paddingHorizontal: 24,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            web: {
                boxShadow: '0 8px 16px rgba(255, 107, 53, 0.25)',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            },
            ios: {
                shadowColor: '#FF6B35',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.25,
                shadowRadius: 16,
            },
            android: {
                elevation: 6,
            }
        })
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: Platform.OS === 'web' ? 18 : 16,
        fontWeight: '700',
        fontFamily: 'Roboto_700Bold',
        letterSpacing: 0.3,
    }
});
