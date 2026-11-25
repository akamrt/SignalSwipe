import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { PickedVideo } from './cards';
import { colors } from './theme';

export function PickScreen({ onPicked }: { onPicked: (videos: PickedVideo[]) => void }) {
  const [message, setMessage] = useState<string | null>(null);

  async function pick() {
    setMessage(null);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['videos'],
      allowsMultipleSelection: true,
    });
    if (result.canceled || result.assets.length === 0) {
      setMessage('No videos picked.');
      return;
    }
    onPicked(
      result.assets.map((asset, i) => ({
        uri: asset.uri,
        name: asset.fileName ?? `Video ${i + 1}`,
        durationMs: asset.duration ?? null,
      })),
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>SignalSwipe</Text>
      <Text style={styles.body}>Pick one or more sermon videos. SignalSwipe makes shorts from them for you to swipe.</Text>
      <Pressable style={styles.button} onPress={pick} accessibilityRole="button">
        <Text style={styles.buttonText}>Pick sermon videos</Text>
      </Pressable>
      {message ? <Text style={styles.note}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', padding: 24, gap: 16, backgroundColor: colors.bg },
  title: { fontSize: 36, fontWeight: '700', color: colors.text },
  body: { fontSize: 17, lineHeight: 24, color: colors.muted },
  button: { backgroundColor: colors.accent, borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  buttonText: { fontSize: 18, fontWeight: '600', color: colors.onAccent },
  note: { fontSize: 15, color: colors.muted },
});
