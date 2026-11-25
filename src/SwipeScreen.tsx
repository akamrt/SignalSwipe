import { useState } from 'react';
import { Animated, PanResponder, Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';

import type { ShortCard } from './cards';
import { verdictFromDrag, type Verdict } from './swipe';
import { colors } from './theme';

type Props = {
  cards: ShortCard[];
  onVerdict: (id: string, verdict: Verdict, note?: string) => void;
  onStartOver: () => void;
};

export function SwipeScreen({ cards, onVerdict, onStartOver }: Props) {
  const { width, height } = useWindowDimensions();
  const [position] = useState(() => new Animated.ValueXY());
  const [askingNoteFor, setAskingNoteFor] = useState<string | null>(null);
  const [note, setNote] = useState('');

  const waiting = cards.filter((c) => !c.verdict);
  const current = waiting[0];

  function finish(verdict: Verdict) {
    const card = current;
    if (!card) return;
    const to =
      verdict === 'redo' ? { x: 0, y: -height } : { x: verdict === 'yes' ? width * 1.5 : -width * 1.5, y: 0 };
    Animated.timing(position, { toValue: to, duration: 180, useNativeDriver: true }).start(() => {
      position.setValue({ x: 0, y: 0 });
      if (verdict === 'redo') {
        setNote('');
        setAskingNoteFor(card.id);
      } else {
        onVerdict(card.id, verdict);
      }
    });
  }
  // Rebuilt each render so it always sees the current card. Dragging only moves the
  // animated value, which does not re-render, so a gesture is never cut off mid-drag.
  const pan = PanResponder.create({
    onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 8 || Math.abs(g.dy) > 8,
    onPanResponderMove: (_, g) => position.setValue({ x: g.dx, y: g.dy }),
    onPanResponderRelease: (_, g) => {
      const verdict = verdictFromDrag(g.dx, g.dy);
      if (verdict) finish(verdict);
      else Animated.spring(position, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start();
    },
  });

  if (askingNoteFor) {
    return (
      <View style={styles.screen}>
        <Text style={styles.heading}>Redo this short</Text>
        <Text style={styles.muted}>What should be different? Leave it empty to just try again.</Text>
        <TextInput
          style={styles.input}
          value={note}
          onChangeText={setNote}
          placeholder="e.g. start a sentence earlier"
          placeholderTextColor={colors.muted}
          multiline
        />
        <Pressable
          style={[styles.button, { backgroundColor: colors.redo }]}
          onPress={() => {
            onVerdict(askingNoteFor, 'redo', note.trim() || undefined);
            setAskingNoteFor(null);
          }}
        >
          <Text style={styles.buttonText}>Redo</Text>
        </Pressable>
      </View>
    );
  }

  if (!current) {
    const count = (v: Verdict) => cards.filter((c) => c.verdict === v).length;
    return (
      <View style={styles.screen}>
        <Text style={styles.heading}>All swiped</Text>
        <Text style={styles.muted}>
          Yes {count('yes')} · No {count('no')} · Redo {count('redo')}
        </Text>
        <Pressable style={[styles.button, { backgroundColor: colors.accent }]} onPress={onStartOver}>
          <Text style={[styles.buttonText, { color: colors.onAccent }]}>Pick more videos</Text>
        </Pressable>
      </View>
    );
  }

  const rotate = position.x.interpolate({ inputRange: [-width, 0, width], outputRange: ['-12deg', '0deg', '12deg'] });

  return (
    <View style={styles.screen}>
      <Text style={styles.muted}>{waiting.length} left to swipe</Text>
      <Animated.View
        {...pan.panHandlers}
        style={[styles.card, { transform: [{ translateX: position.x }, { translateY: position.y }, { rotate }] }]}
      >
        <Text style={styles.cardHook}>{current.hook}</Text>
        <Text style={styles.muted}>From {current.video.name}</Text>
        <Text style={styles.hint}>Right = yes · Left = no · Up = redo</Text>
      </Animated.View>
      <View style={styles.row}>
        <RoundButton label="No" color={colors.no} onPress={() => finish('no')} />
        <RoundButton label="Redo" color={colors.redo} onPress={() => finish('redo')} />
        <RoundButton label="Yes" color={colors.yes} onPress={() => finish('yes')} />
      </View>
    </View>
  );
}

function RoundButton({ label, color, onPress }: { label: string; color: string; onPress: () => void }) {
  return (
    <Pressable style={[styles.round, { borderColor: color }]} onPress={onPress} accessibilityRole="button">
      <Text style={[styles.roundText, { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 16, backgroundColor: colors.bg },
  heading: { fontSize: 28, fontWeight: '700', color: colors.text },
  muted: { fontSize: 15, color: colors.muted },
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 24,
    justifyContent: 'center',
    gap: 12,
  },
  cardHook: { fontSize: 26, fontWeight: '700', color: colors.text },
  hint: { fontSize: 13, color: colors.muted, marginTop: 24 },
  row: { flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 24 },
  round: { width: 84, height: 84, borderRadius: 42, borderWidth: 3, alignItems: 'center', justifyContent: 'center' },
  roundText: { fontSize: 16, fontWeight: '700' },
  input: {
    minHeight: 100,
    borderRadius: 14,
    padding: 14,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.card,
    textAlignVertical: 'top',
  },
  button: { borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  buttonText: { fontSize: 18, fontWeight: '600', color: colors.text },
});
