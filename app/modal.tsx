import { Link } from 'expo-router';

import { ThemedText } from '@Global/components/themed-text';
import { ThemedView } from '@Global/components/themed-view';
import { styles } from '@Global/compartido/estilos/modal.styles';

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">This is a modal</ThemedText>
      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link">Go to home screen</ThemedText>
      </Link>
    </ThemedView>
  );
}
