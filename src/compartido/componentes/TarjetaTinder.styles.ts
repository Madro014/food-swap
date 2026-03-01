import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

// medidas responsivas y proporcionales
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = height * 0.65;

export const styles = StyleSheet.create({
    cardWrapper: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        justifyContent: 'flex-end',
        padding: 20,
        paddingBottom: 30,
        
    },
    infoContainer: {
        width: '100%',
        zIndex: 10,
    },
    name: {
        fontSize: 32,
        color: '#FFFFFF',
        fontWeight: '800',
        fontFamily: 'Inter_700Bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        marginBottom: 8,
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    restaurant: {
        fontSize: 18,
        color: '#F8F9FA',
        fontWeight: '600',
        fontFamily: 'Inter_600SemiBold',
        marginRight: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
    },
    distanceBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        backdropFilter: 'blur(10px)',
    },
    distance: {
        fontSize: 14,
        color: '#FFFFFF',
        fontWeight: '700',
        fontFamily: 'Inter_700Bold',
    },
    badge: {
        position: 'absolute',
        top: 50,
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 4,
        zIndex: 100,
    },
    likeBadge: {
        left: 40,
        borderColor: '#4ADE80',
    },
    nopeBadge: {
        right: 40,
        borderColor: '#F87171',
    },
    badgeText: {
        fontSize: 32,
        fontWeight: '900',
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    likeText: {
        color: '#4ADE80',
    },
    nopeText: {
        color: '#F87171',
    }
});
