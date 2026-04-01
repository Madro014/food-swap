import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    group: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontFamily: 'Inter_700Bold',
        color: '#605a57',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#eae1db',
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 16,
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        color: '#322e2b',
        borderWidth: 0,
    },
    inputError: {
        borderWidth: 1,
        borderColor: '#b31b25',
    },
    errorText: {
        fontSize: 13,
        color: '#b31b25',
        fontFamily: 'Inter_400Regular',
        marginTop: 4,
    },
});
