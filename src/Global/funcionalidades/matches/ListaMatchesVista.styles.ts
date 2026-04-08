import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFCFB',
    },
    headerSpace: {
        paddingHorizontal: 24,
        paddingTop: 30,
        paddingBottom: 10,
    },
    headerSpaceWeb: {
        maxWidth: 1100,
        alignSelf: 'center',
        width: '100%',
        paddingHorizontal: 40,
        paddingTop: 40,
        paddingBottom: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#322E2B',
        letterSpacing: -0.8,
    },
    subtitle: {
        fontSize: 16,
        color: '#8B7E74',
        marginTop: 8,
        lineHeight: 22,
        fontWeight: '500',
    },

    // ── Container para las tarjetas ──
    listWrapper: {
        flex: 1,
        justifyContent: 'center', // Centro vertical real
    },
    matchesContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 120,
        gap: 16,
    },
    matchesContainerWeb: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        maxWidth: 1500, // Más ancho
        alignSelf: 'center',
        width: '100%',
        paddingHorizontal: 40,
        paddingBottom: 0, // Quitamos padding exagerado abajo
        gap: 80, // Más espacio entre tarjetas
        marginTop: -165, // Subimos las cartas un poco
    },
    matchItem: {
        width: '100%',
        maxWidth: 400,
    },
    matchItemWeb: {
        flex: 1,
        maxWidth: 400, // Más grandes
    },

    // ── Badge del contador ──
    counterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 12,
    },
    counterBadge: {
        backgroundColor: '#FF6B35',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
    },
    counterText: {
        color: '#FFFFFF',
        fontWeight: '800',
        fontSize: 12,
    },

    // ── Estado vacío ──
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        marginTop: -50,
    },
    emptyIcon: {
        fontSize: 80,
        marginBottom: 20,
    },
    emptyText: {
        fontSize: 22,
        fontWeight: '800',
        color: '#322E2B',
        textAlign: 'center',
    },
    emptySub: {
        fontSize: 16,
        color: '#8B7E74',
        textAlign: 'center',
        marginTop: 12,
        lineHeight: 24,
    }
});