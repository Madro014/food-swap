import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, View, Text, Modal } from 'react-native';
import * as Location from 'expo-location';
import { Boton } from '@Global/compartido/componentes/atomos/Boton';
import { useAuthStore } from '@Global/funcionalidades/auth/useAuthStore';
import { estilosTab, getTabBarStyle } from '@Movil/tabs/styles/tabBar.styles';
import { estilosBloqueo } from '@Movil/tabs/styles/bloqueo.styles';

import { HapticTab } from '@Global/components/haptic-tab';
import { IconSymbol } from '@Global/components/ui/icon-symbol';

export default function TabLayout() {
  const [permisoUbicacion, setPermisoUbicacion] = useState<Location.PermissionStatus | null>(null);
  const [alertaLocalizacion, setAlertaLocalizacion] = useState(false);
  const [mostrarAyudaWeb, setMostrarAyudaWeb] = useState(false);
  const { alcanceKm } = useAuthStore();

  const solicitarUbicacion = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    setPermisoUbicacion(status);
    if (status === 'granted') {
      setAlertaLocalizacion(true);
      setMostrarAyudaWeb(false);
    } else if (status === 'denied' && Platform.OS === 'web') {
      setMostrarAyudaWeb(true);
    }
  };

  useEffect(() => {
    solicitarUbicacion();
  }, []);

  if (permisoUbicacion === null) {
    return null; // Cargando el estado del permiso
  }

  if (permisoUbicacion !== 'granted') {
    return (
      <View style={estilosBloqueo.contenedor}>
        <Text style={estilosBloqueo.titulo}>Activación de Ubicación</Text>
        <Text style={estilosBloqueo.descripcion}>
          Para poder mostrarte los mejores platos y lugares cerca de ti, necesitamos acceso a tu ubicación. 
          No podrás usar la aplicación hasta que actives este permiso.
        </Text>

        {mostrarAyudaWeb && (
          <View style={estilosBloqueo.ayudaWebCaja}>
            <Text style={estilosBloqueo.ayudaWebTexto}>
              ⚠️ Tu navegador ha bloqueado pop-ups de ubicación. Para activarla, haz clic en el ícono que parece un candado o escudo 🔒 junto a la barra superior del navegador web, permite la &quot;Ubicación&quot; y finalmente recarga esta página.
            </Text>
          </View>
        )}

        <Boton titulo="Activar Ubicación" onPress={solicitarUbicacion} />
      </View>
    );
  }

  return (
    <>
    <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#FF6B35',
          tabBarInactiveTintColor: '#B3ACA7',
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarShowLabel: true,
          tabBarLabelStyle: estilosTab.tabBarLabel,
          tabBarStyle: getTabBarStyle(),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Descubrir',
            tabBarIcon: ({ color }) => <IconSymbol size={32} name="flame.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore" // Cambiado de explore a explore/matches si es el caso, pero el archivo actual dice explore
          options={{
            title: 'Matches',
            tabBarIcon: ({ color }) => <IconSymbol size={32} name="heart.fill" color={color} />,
          }}
        />
      </Tabs>
      
      <Modal
        visible={alertaLocalizacion}
        transparent={true}
        animationType="fade"
      >
        <View style={estilosBloqueo.overlayModal}>
            <View style={estilosBloqueo.tarjetaModal}>
                <Text style={estilosBloqueo.tituloModal}>Aviso de ubicación</Text>
                <Text style={estilosBloqueo.textoModal}>Máximo alcance de {alcanceKm}km (Si lo deseas cambiar ir a tu perfil)</Text>
                <Boton titulo="Entendido" onPress={() => setAlertaLocalizacion(false)} />
            </View>
        </View>
      </Modal>
    </>
  );
}