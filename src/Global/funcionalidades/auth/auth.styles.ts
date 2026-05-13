import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdf2e9',
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
        backgroundColor: '#FF6B35', // Deep vibrant orange
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
        opacity: 0.2, 
    },
    // Overlay to make text pop against background
    webBrandOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    webBrandTextContainer: {
        padding: 40,
        width: '100%',
        maxWidth: 550,
        alignItems: 'flex-start',
        zIndex: 10,
    },
    webLogo: {
        width: '80%',
        maxWidth: 320,
        height: undefined,
        aspectRatio: 1,
        marginBottom: 40,
    },
    webHeadline: {
        fontSize: Platform.OS === 'web' ? 72 : 40,
        fontFamily: 'Inter_800ExtraBold',
        color: '#ffffff',
        marginBottom: 24,
        lineHeight: Platform.OS === 'web' ? 82 : 48,
        letterSpacing: -2,
    },
    webSubHeadline: {
        fontSize: 24,
        fontFamily: 'Inter_400Regular',
        color: 'rgba(255, 255, 255, 0.9)',
        lineHeight: 36,
        maxWidth: 480,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: '6%',
        zIndex: 1,
    },
    contentWeb: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: '50%',
        backgroundColor: '#ffffff',
        paddingHorizontal: '6%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentInnerMobile: {
        width: '100%',
        marginBottom: 40,
        alignItems: 'center',
    },
    // Glassmorphism Premium Form Container
    formContainer: {
        backgroundColor: Platform.OS === 'web' ? '#ffffff' : 'rgba(255, 255, 255, 0.95)',
        borderRadius: 40,
        padding: 36,
        width: '100%',
        borderWidth: 0,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 20 },
                shadowOpacity: 0.2,
                shadowRadius: 40,
            },
            android: {
                elevation: 15,
            },
            web: {
                boxShadow: '0 30px 70px rgba(0, 0, 0, 0.15)',
            }
        })
    },
    formContainerWeb: {
        width: '85%',
        maxWidth: 520,
        padding: 56, // More breathing room
        borderRadius: 40,
        backgroundColor: '#ffffff',
    },
    linkContainer: {
        marginTop: 32,
        alignItems: 'center',
    },
    linkText: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        color: '#7a726e',
    },
    linkTextBold: {
        color: '#FF6B35',
        fontFamily: 'Inter_700Bold',
        marginLeft: 6,
    },
});
