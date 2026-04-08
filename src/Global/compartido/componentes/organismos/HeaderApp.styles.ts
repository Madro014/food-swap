import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: isWeb ? 40 : 20,
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        paddingBottom: 20,
        backgroundColor: isWeb ? 'rgba(253, 252, 251, 0.85)' : '#FFFFFF',
        width: '100%',
        ...(isWeb && {
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.03)',
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(255, 107, 53, 0.08)',
        }),
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    logoImage: {
        width: isWeb ? 48 : 40,
        height: isWeb ? 48 : 40,
        borderRadius: 12,
    },
    title: {
        fontSize: isWeb ? 24 : 20,
        fontWeight: '900',
        color: '#FF6B35', // Brand Orange
        letterSpacing: -0.5,
    },
    userSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    userProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#FEEDE4',
        shadowColor: '#FF6B35',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
        ...(isWeb && { cursor: 'pointer' } as any),
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 14,
        marginRight: 12,
        backgroundColor: '#F3F0EE',
        borderWidth: 1,
        borderColor: '#FEEDE4',
    },
    userName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#322E2B',
        maxWidth: 120,
    },
    logoutButton: {
        width: 48,
        height: 48,
        backgroundColor: '#FFF5F5',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FEE2E2',
        shadowColor: '#EF4444',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 2,
        ...(isWeb && { cursor: 'pointer' } as any),
    }
});