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
  },
});

export const getTabBarStyle = () => {
  return isWeb ? estilosTab.tabBarWeb : estilosTab.tabBarMobile;
};
