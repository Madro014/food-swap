import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAF9',
        alignItems: 'center',
        paddingTop: 10, // Menos padding en contenedor general
    },
    headerSpace: {
        width: '95%',
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: 40,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logoImage: {
        width: 36,
        height: 36,
    },
    title: {
        fontSize: 24, // reducido para poner el logo
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
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    userProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#F3F4F6',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    userAvatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#E5E7EB',
    },
    userName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        fontFamily: 'Inter_600SemiBold',
        maxWidth: 100,
    },
    logoutButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#FEF2F2',
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
