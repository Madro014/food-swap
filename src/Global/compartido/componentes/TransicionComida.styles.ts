import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 50,
        boxShadow: '0px 0px 0px 9999px rgba(0,0,0,0)',
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emoji: {
        fontSize: 50,
    },
    image: {
        width: 60,
        height: 60,
    }
});
