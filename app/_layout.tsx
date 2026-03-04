import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '@/src/funcionalidades/auth/useAuthStore';
import { Inter_400Regular, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRootNavigationState, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';


// evita que la pantalla de carga se vaya antes de que tengamos las letras listas
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const userName = useAuthStore(state => state.userName);
  const router = useRouter();
  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();

  // carga las letras Inter que nos regalo gogle fonts
  const [letrasCargadas] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
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
        // Si se han logueado, redirigilos a las tabs
        setTimeout(() => router.replace('/(tabs)'), 10);
      }
    }
  }, [letrasCargadas, rootNavigationState?.key, userName, segments]);

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
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}