import { StyleSheet, Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export const styles = StyleSheet.create({
    stack: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#F7F4F2', // Un crema elegante y premium
        justifyContent: 'center',
    },
    cardsContainer: {
        width: '100%',
        height: isWeb ? 580 : 520, // Un poco más alto para lucir la info
        maxWidth: 480, // Un poco más ancho para web
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: 40,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F4F2',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 18,
        color: '#8B7E74',
        fontWeight: '600',
        letterSpacing: -0.2,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        backgroundColor: '#F7F4F2',
    },
    emptyIcon: {
        fontSize: 120,
        marginBottom: 24,
    },
    emptyText: {
        fontSize: 28,
        fontWeight: '900',
        color: '#322E2B',
        textAlign: 'center',
        letterSpacing: -1,
    },
    emptySub: {
        fontSize: 18,
        color: '#8B7E74',
        textAlign: 'center',
        marginTop: 16,
        lineHeight: 28,
        fontWeight: '500',
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 48,
        paddingVertical: 20,
        paddingBottom: isWeb ? 120 : 100, // space for the floating dock
        width: '100%',
        zIndex: 10,
    },
    actionButtonWrapper: {
        alignItems: 'center',
        gap: 8,
    },
    actionButtonLabel: {
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 0.5,
        textTransform: 'uppercase' as const,
    },
    actionButtonLabelX: {
        color: '#EF4444',
    },
    actionButtonLabelHeart: {
        color: '#10B981',
    },
    actionButton: {
        width: 68,
        height: 68,
        borderRadius: 34,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 8,
        borderWidth: 1.5,
        borderColor: '#F3F0EE',
        cursor: isWeb ? 'pointer' : 'auto',
    } as any,
    actionButtonLarge: {
        width: 68,
        height: 68,
        borderRadius: 34,
        shadowColor: '#10B981',
        shadowOpacity: 0.25,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },
        elevation: 10,
        borderWidth: 0,
    },
    buttonX: {
        backgroundColor: '#FFFFFF',
        borderColor: '#FECACA',
        shadowColor: '#EF4444',
        shadowOpacity: 0.15,
        shadowRadius: 16,
    },
    buttonHeart: {
        backgroundColor: '#FFFFFF',
        borderColor: '#A7F3D0',
    },
});
