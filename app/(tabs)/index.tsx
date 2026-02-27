import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import VistaDePlatos from '../../src/funcionalidades/platos/PlatosVista';

export default function HomeScreen() {
  // Envolvemos en GestureHandlerRootView para que los gestos funcionen
  return (
    <GestureHandlerRootView style={estilo.completo}>
      <VistaDePlatos />
    </GestureHandlerRootView>
  );
}

const estilo = StyleSheet.create({
  completo: {
    flex: 1, // ocupa todo el espacio
  },
});
