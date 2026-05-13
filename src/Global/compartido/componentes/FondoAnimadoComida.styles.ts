import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fdf2e9', // Warm cream/light orange
        overflow: 'hidden',
        zIndex: -1,
    },
    emoji: {
        position: 'absolute',
        opacity: 0.15,
        textAlign: 'center',
        includeFontPadding: false,
    },
});