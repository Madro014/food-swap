import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6', 
        alignItems: 'center',
        paddingTop: 60,
    },
    headerSpace: {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#FF6B6B', 
        fontFamily: 'Inter_700Bold',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 14,
        color: '#868E96',
        fontFamily: 'Inter_400Regular',
        marginTop: 4,
    },
    cardsContainer: {
        flex: 1,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -40, // para centrar mejor las tarjetas con el header
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F3F4F6',
    },
    loadingText: {
        marginTop: 20,
        fontSize: 18,
        color: '#FF6B6B',
        fontFamily: 'Inter_600SemiBold',
        fontWeight: '600',
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        paddingHorizontal: 40,
        marginBottom: 40,
        position: 'absolute',
        bottom: 20,
    },
    actionButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    actionIcon: {
        fontSize: 28,
    },
    noMoreCardsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    noMoreCardsText: {
        fontSize: 24,
        color: '#495057',
        fontWeight: '700',
        marginBottom: 10,
    },
    noMoreCardsSub: {
        fontSize: 16,
        color: '#868E96',
        textAlign: 'center',
    }
});
