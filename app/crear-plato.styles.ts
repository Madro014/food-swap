import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FF7E40',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 12, // Reduced from 24
        paddingBottom: 24, // Reduced from 40
    }
});
