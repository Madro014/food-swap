import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import VistaDePlatos from '@Global/funcionalidades/platos/PlatosVista';

export default function HomeScreen() {
  return (
    <GestureHandlerRootView style={estilo.completo}>
      <VistaDePlatos />
    </GestureHandlerRootView>
  );
}

const estilo = StyleSheet.create({
  completo: {
    flex: 1, 
  },
});