import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
        backgroundColor: 'transparent',
        zIndex: -1, // Ensure it stays in the background
    },
    emoji: {
        position: 'absolute',
        opacity: 0.3, // Subtle opacity
    },
});
