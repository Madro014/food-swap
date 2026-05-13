import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import VistaDePlatos from '@Global/funcionalidades/platos/PlatosVista';
import { estilo } from '@Global/compartido/estilos/tabsIndex.styles';

export default function HomeScreen() {
  return (
    <GestureHandlerRootView style={estilo.completo}>
      <VistaDePlatos />
    </GestureHandlerRootView>
  );
}