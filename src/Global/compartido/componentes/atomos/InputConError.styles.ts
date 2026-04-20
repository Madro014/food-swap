import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    group: {
        marginBottom: 8, // Reduced from 12
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
        paddingHorizontal: 14,
        borderWidth: 1.5,
        borderColor: '#F0EBE7',
    },
    inputContainerFocused: {
        borderColor: '#FF6B35',
        backgroundColor: '#FFFCFA',
        shadowColor: '#FF6B35',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
    },
    leftIconContainer: {
        marginRight: 4,
    },
    input: {
        flex: 1,
        paddingVertical: 11,
        fontSize: 14,
        fontFamily: 'Roboto_400Regular',
        color: '#322e2b',
        borderWidth: 0,
    },
    inputError: {
        borderWidth: 1.5,
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
