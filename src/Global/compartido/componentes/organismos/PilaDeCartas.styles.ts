import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const isDesktop = width > 768;

export const styles = StyleSheet.create({
    stack: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fef5f0',
        paddingBottom: isDesktop ? 120 : 24,
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
    cardsContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: isDesktop ? 24 : 12,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    emptyText: {
        fontSize: 24,
        color: '#495057',
        fontWeight: '700',
        marginBottom: 10,
    },
    emptySubText: {
        fontSize: 16,
        color: '#868E96',
        textAlign: 'center',
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: isDesktop ? 60 : 30,
        width: '100%',
        marginTop: isDesktop ? 12 : 8,
        marginBottom: isDesktop ? 8 : 0,
        paddingBottom: isDesktop ? 0 : 12,
        zIndex: 20,
    },
    actionButton: {
        width: isDesktop ? 72 : 64,
        height: isDesktop ? 72 : 64,
        borderRadius: isDesktop ? 36 : 32,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#110c0a',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: isDesktop ? 0.08 : 0.04,
        shadowRadius: 15,
        elevation: 5,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.03)',
    },
    actionIcon: {
        fontSize: 28,
    },
});
