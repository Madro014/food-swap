import { StyleSheet, Platform } from 'react-native';

const isWeb = Platform.OS === 'web';
const isIos = Platform.OS === 'ios';

export const estilosTab = StyleSheet.create({
  tabBarLabel: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 5,
  },
  tabBarWeb: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 107, 53, 0.1)',
    position: 'absolute',
    bottom: 30,
    left: '50%',
    transform: [{ translateX: -250 }] as any,
    width: 500,
    borderRadius: 35,
    height: 80,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 15,
    zIndex: 1000,
    // Note: backdropFilter and WebkitBackdropFilter are web-only properties
    // that might need to be applied via style prop or cast to any
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    paddingTop: 12,
    paddingBottom: 15,
  } as any,
  tabBarMobile: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    height: isIos ? 95 : 85,
    paddingBottom: isIos ? 30 : 10,
    paddingTop: 10,
    elevation: 15,
    zIndex: 1000,
  }
});

export const estilosBloqueo = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#322e2b',
    marginBottom: 16,
    textAlign: 'center',
  },
  descripcion: {
    fontSize: 16,
    color: '#605a57',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  ayudaWebCaja: {
    backgroundColor: '#fff3ed',
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#ffdcc2',
  },
  ayudaWebTexto: {
    color: '#D9501E',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
  },
  overlayModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  tarjetaModal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  tituloModal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 12,
  },
  textoModal: {
    fontSize: 16,
    color: '#605a57',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  }
});

export const getTabBarStyle = () => {
  return isWeb ? estilosTab.tabBarWeb : estilosTab.tabBarMobile;
};