import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        paddingTop: 60,
    },
    headerSpace: {
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#FF6B6B',
        fontFamily: 'Inter_700Bold',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#868E96',
        fontFamily: 'Inter_400Regular',
        marginTop: 4,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 100, // Espacio para el menú inferior
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    emptyIcon: {
        fontSize: 60,
        marginBottom: 15,
    },
    emptyText: {
        fontSize: 22,
        color: '#495057',
        fontWeight: '700',
        fontFamily: 'Inter_700Bold',
        textAlign: 'center',
    },
    emptySub: {
        fontSize: 16,
        color: '#868E96',
        textAlign: 'center',
        marginTop: 8,
        fontFamily: 'Inter_400Regular',
    },
    matchCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 12,
        marginBottom: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    matchImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 15,
    },
    matchInfo: {
        flex: 1,
    },
    matchName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#343A40',
        fontFamily: 'Inter_700Bold',
        marginBottom: 4,
    },
    matchRestaurant: {
        fontSize: 14,
        color: '#868E96',
        fontFamily: 'Inter_400Regular',
    },
    actionButton: {
        backgroundColor: '#FF6B6B',
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionIcon: {
        fontSize: 18,
    }
});
