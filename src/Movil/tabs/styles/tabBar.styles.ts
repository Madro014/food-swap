import { StyleSheet, Platform, Dimensions } from 'react-native';

const isWeb = Platform.OS === 'web';
const isIos = Platform.OS === 'ios';

export const estilosTab = StyleSheet.create({
  tabBarLabel: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 2,
  },
  tabBarWeb: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 107, 53, 0.1)',
    position: 'absolute',
    bottom: 30,
    borderRadius: 35,
    height: 75, // Reducir un poco
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 15,
    zIndex: 1000,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    paddingTop: 8,
    paddingBottom: 10,
  } as any,
  tabBarMobile: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    height: isIos ? 85 : 75, // Ajustar
    paddingBottom: isIos ? 25 : 5,
    paddingTop: 5,
    elevation: 15,
    zIndex: 1000,
  },
});

export const getTabBarStyle = (width?: number) => {
  if (!isWeb) return estilosTab.tabBarMobile;
  
  const screenWidth = width || Dimensions.get('window').width;
  const isMobileBrowser = screenWidth < 500;
  const isTabletBrowser = screenWidth >= 500 && screenWidth < 900;
  
  if (isMobileBrowser) {
    return {
      ...estilosTab.tabBarWeb,
      width: '100%',
      left: 0,
      bottom: 0,
      marginLeft: 0,
      borderRadius: 0,
      borderTopWidth: 1,
      height: 70,
      paddingBottom: 5,
    };
  }

  return {
    ...estilosTab.tabBarWeb,
    width: isTabletBrowser ? '90%' : 500,
    left: isTabletBrowser ? '5%' : '50%',
    marginLeft: isTabletBrowser ? 0 : -250,
  };
};
