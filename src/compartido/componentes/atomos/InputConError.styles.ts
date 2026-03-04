import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    group: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontFamily: 'Inter_700Bold',
        color: '#11181C',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        color: '#11181C',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    inputError: {
        borderColor: '#ff4b4b',
    },
    errorText: {
        fontSize: 13,
        color: '#ff4b4b',
        fontFamily: 'Inter_400Regular',
        marginTop: 4,
    },
});
