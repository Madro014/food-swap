import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const isDesktop = width > 768;
const CARD_WIDTH = isDesktop ? 780 : width * 0.9;
const CARD_HEIGHT = isDesktop ? 520 : height * 0.7;

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
        borderRadius: isDesktop ? 48 : 32,
        shadowColor: '#110c0a',
        shadowOffset: { width: 0, height: isDesktop ? 25 : 10 },
        shadowOpacity: isDesktop ? 0.12 : 0.05,
        shadowRadius: isDesktop ? 40 : 15,
        elevation: isDesktop ? 15 : 6,
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
        fontSize: isDesktop ? 38 : 28,
        color: '#FFFFFF',
        fontFamily: 'Inter_800ExtraBold',
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 15,
        marginBottom: 8,
        letterSpacing: -0.5,
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
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        // Web only blur
        backdropFilter: 'blur(12px)',
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
