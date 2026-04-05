import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '@Global/funcionalidades/auth/useAuthStore';
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold, useFonts } from '@expo-google-fonts/inter';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { Platform, StatusBar as RNStatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';


// evita que la pantalla de carga se vaya antes de que tengamos las letras listas
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const userName = useAuthStore(state => state.userName);
  const rol = useAuthStore(state => state.rol);
  const platosNegocio = useAuthStore(state => state.platosNegocio);
  const router = useRouter();
  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();

  // carga las letras Inter que nos regalo gogle fonts
  const [letrasCargadas] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  useEffect(() => {
    if (letrasCargadas && rootNavigationState?.key) {
      SplashScreen.hideAsync(); // Ocultala carga cuando las letras estan listas

      // Controlar el inicio de sesion
      const isInAuthGroup = segments[0] === 'login' || segments[0] === 'registro';
      if (!userName && !isInAuthGroup) {
        // Redirigir siempre a login si no tienen nombre guardado
        setTimeout(() => router.replace('/login'), 10);
      } else if (userName && isInAuthGroup) {
        // Si se han logueado, redirigilos a su lugar de inicio según rol
        if (rol === 'negocio') {
            setTimeout(() => router.replace('/(negocio)' as any), 10);
        } else {
            setTimeout(() => router.replace('/(tabs)' as any), 10);
        }
      }
    }
  }, [letrasCargadas, rootNavigationState?.key, userName, rol, platosNegocio, segments, router]);

  useEffect(() => {
    // Forzar ocultar la barra de estado del sistema (hora, bateria, etc) al arrancar
    if (Platform.OS !== 'web') {
      RNStatusBar.setHidden(true, 'fade');
    }
  }, []);

  if (!letrasCargadas) {
    return null; // s no hay letras, no mostramos nada todavia
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="login">
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="registro" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar hidden={true} />
    </ThemeProvider>
  );
}