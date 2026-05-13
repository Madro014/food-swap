import { StyleSheet } from 'react-native';

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
        paddingHorizontal: 14,
        borderWidth: 1.5,
        borderColor: '#F0EBE7',
        height: 48, // Altura fija para evitar saltos de layout
    },
    inputContainerFocused: {
        borderColor: '#FF6B35',
        // Eliminamos sombras y cambios de fondo que pueden causar pérdida de foco en Android
    },
    leftIconContainer: {
        marginRight: 4,
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 14,
        fontFamily: 'Roboto_400Regular',
        color: '#322e2b',
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
