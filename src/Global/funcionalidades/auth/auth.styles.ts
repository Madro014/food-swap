import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fef5f0',
        overflow: 'hidden',
    },
    containerWeb: {
        flexDirection: 'row',
    },
    webBrandSide: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '50%',
        backgroundColor: '#FF6B35',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    webBrandSideBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.3,
    },
    webBrandTextContainer: {
        padding: 40,
        width: '100%',
        maxWidth: 500,
        alignItems: 'flex-start',
        zIndex: 10,
    },
    webLogo: {
        width: '70%',
        maxWidth: 280,
        height: undefined,
        aspectRatio: 1, // Adjusted for typical logo proportions
        marginBottom: 32,
    },
    webHeadline: {
        fontSize: Platform.OS === 'web' ? 56 : 32,
        fontFamily: 'Inter_800ExtraBold',
        color: '#ffffff',
        marginBottom: 20,
        lineHeight: Platform.OS === 'web' ? 64 : 40,
        letterSpacing: -1,
    },
    webSubHeadline: {
        fontSize: 20,
        fontFamily: 'Inter_400Regular',
        color: 'rgba(255, 255, 255, 0.9)',
        lineHeight: 30,
        maxWidth: 400,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: '5%',
        zIndex: 1,
    },
    contentWeb: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '50%',
        backgroundColor: '#ffffff',
        paddingHorizontal: '5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentInnerMobile: {
        width: '100%',
    },
    formContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 32,
        padding: 24,
        width: '100%',
        ...Platform.select({
            ios: {
                shadowColor: '#322e2b',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.08,
                shadowRadius: 20,
            },
            android: {
                elevation: 8,
            },
            web: {
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.05)',
            }
        })
    },
    formContainerWeb: {
        width: '85%',
        maxWidth: 520,
        padding: 48,
        borderRadius: 40,
    },
    linkContainer: {
        marginTop: 24,
        alignItems: 'center',
    },
    linkText: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        color: '#605a57',
    },
    linkTextBold: {
        color: '#FF6B35',
        fontFamily: 'Inter_700Bold',
    },
});
