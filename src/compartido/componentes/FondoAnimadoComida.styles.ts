import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
        backgroundColor: 'transparent',
        zIndex: -1, // asegura de que permanezca en segundo plano (osea por detras de todo)
    },
    emoji: {
        position: 'absolute',
        opacity: 0.3, // opacidad
    },
});