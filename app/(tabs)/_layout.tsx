import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, View, Text, StyleSheet, Modal } from 'react-native';
import * as Location from 'expo-location';
import { Boton } from '@Global/compartido/componentes/atomos/Boton';
import { useAuthStore } from '@Global/funcionalidades/auth/useAuthStore';


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
              ⚠️ Tu navegador ha bloqueado pop-ups de ubicación. Para activarla, haz clic en el ícono que parece un candado o escudo 🔒 junto a la barra superior del navegador web, permite la "Ubicación" y finalmente recarga esta página.
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
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Inter_600SemiBold',
            marginBottom: 5,
          },
          tabBarStyle: Platform.OS === 'web' ? {
              backgroundColor: '#ffffff',
              borderTopWidth: 0,
              position: 'absolute',
              bottom: 20,
              left: 20,
              right: 20,
              borderRadius: 24,
              height: 74,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.05,
              shadowRadius: 15,
              elevation: 10,
              zIndex: 1000,
            } : {
              backgroundColor: '#ffffff',
              borderTopWidth: 1,
              borderTopColor: '#f3f4f6',
              height: Platform.OS === 'ios' ? 95 : 85, // Un poco mas de alto para las etiquetas
              paddingBottom: Platform.OS === 'ios' ? 30 : 10,
              paddingTop: 10,
              elevation: 15,
              zIndex: 1000,
            },
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

const estilosBloqueo = StyleSheet.create({
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