import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    group: {
        marginBottom: 8,

    },
    label: {
        fontSize: 11,
        fontFamily: 'Roboto_700Bold',
        color: '#8B7E74',
        marginBottom: 6,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    labelFocused: {
        color: '#FF6B35',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingHorizontal: 16,
        borderWidth: 1.5,
        borderColor: '#F0EBE7',
        height: Platform.OS === 'web' ? 56 : 48,
    },
    inputContainerFocused: {
        borderColor: '#FF6B35',
    },
    leftIconContainer: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: Platform.OS === 'web' ? 16 : 14,
        fontFamily: 'Roboto_400Regular',
        color: '#322e2b',
        outlineStyle: 'none' as any, // Remove focus ring on web
    },
    inputError: {
        borderColor: '#D93545',
    },
    errorText: {
        fontSize: 11,
        color: '#D93545',
        fontFamily: 'Roboto_400Regular',
        marginTop: 4,
        marginLeft: 2,
    },
});
