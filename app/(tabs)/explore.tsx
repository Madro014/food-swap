import React from 'react';
import { StyleSheet, View } from 'react-native';
import ListaMatchesVista from '../../src/funcionalidades/matches/ListaMatchesVista';

export default function MatchesTabScreen() {
  return (
    <View style={styles.container}>
      <ListaMatchesVista />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6'
  }
});
