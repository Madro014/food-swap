import React from 'react';
import { View } from 'react-native';
import ListaMatchesVista from '@Global/funcionalidades/matches/ListaMatchesVista';
import { styles } from '@Global/compartido/estilos/explore.styles';

export default function MatchesTabScreen() {
  return (
    <View style={styles.container}>
      <ListaMatchesVista />
    </View>
  );
}
