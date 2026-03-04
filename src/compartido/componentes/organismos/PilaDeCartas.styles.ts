import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    stack: {
        flex: 1,
        width: '100%',
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
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -40,
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
        justifyContent: 'space-evenly',
        width: '100%',
        paddingHorizontal: 40,
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
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    actionIcon: {
        fontSize: 28,
    },
});
