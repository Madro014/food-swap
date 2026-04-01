import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fef5f0', // Zest & Hearth Base background
        paddingTop: 60,
    },
    headerSpace: {
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    headerSpaceWeb: {
        paddingHorizontal: 60,
        paddingTop: 40,
        marginBottom: 30,
        maxWidth: 1200,
        marginHorizontal: 'auto',
        width: '100%',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#FF6B35',
        fontFamily: 'Inter_700Bold',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#605a57',
        fontFamily: 'Inter_400Regular',
        marginTop: 4,
    },
    listWrapper: {
        flex: 1,
        maxWidth: 1200,
        marginHorizontal: 'auto',
        width: '100%',
    },
    listContent: {
        paddingHorizontal: 10,
        paddingBottom: 100,
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
        color: '#322e2b',
        fontWeight: '700',
        fontFamily: 'Inter_700Bold',
        textAlign: 'center',
    },
    emptySub: {
        fontSize: 16,
        color: '#605a57',
        textAlign: 'center',
        marginTop: 8,
        fontFamily: 'Inter_400Regular',
    },
});