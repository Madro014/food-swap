import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
        zIndex: 1,
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    linkContainer: {
        marginTop: 24,
        alignItems: 'center',
    },
    linkText: {
        fontSize: 15,
        fontFamily: 'Inter_400Regular',
        color: '#687076',
    },
    linkTextBold: {
        color: '#ff4b4b',
        fontFamily: 'Inter_700Bold',
    },
});
