import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import { placeholderCards, type ShortCard } from './src/cards';
import { PickScreen } from './src/PickScreen';
import { SwipeScreen } from './src/SwipeScreen';

export default function App() {
  const [cards, setCards] = useState<ShortCard[] | null>(null);

  return (
    <>
      <StatusBar style="light" />
      {cards ? (
        <SwipeScreen
          cards={cards}
          onVerdict={(id, verdict) => setCards((all) => all?.map((c) => (c.id === id ? { ...c, verdict } : c)) ?? null)}
          onStartOver={() => setCards(null)}
        />
      ) : (
        <PickScreen onPicked={(videos) => setCards(placeholderCards(videos))} />
      )}
    </>
  );
}
