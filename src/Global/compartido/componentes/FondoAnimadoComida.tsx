import React, { useEffect, useMemo } from 'react';
import { View, useWindowDimensions, Platform } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  withSequence,
  Easing
} from 'react-native-reanimated';
import { styles } from './FondoAnimadoComida.styles';

// Lista de emojis de comida
const FOOD_EMOJIS = ['🍕', '🍔', '🌮', '🥗', '🍣', '🍜', '🥘', '🍝', '🥑', '🍓', '🍒', '🥝', '🍊', '🍋', '🍎', '🥦', '🌽', '🥕', '🧀', '🥚', '🍳', '🥞', '🍩', '🎂', '🍪', '🍫', '🍬', '🍭', '🍮', '🍯', '🧁'];

interface FloatingEmojiProps {
  emoji: string;
  x: number;
  y: number;
  size: number;
  duration: number;
}

const FloatingEmoji = ({ emoji, x, y, size, duration }: FloatingEmojiProps) => {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const rotateValue = useSharedValue(0);

  useEffect(() => {
    // Animación vertical suave
    translateY.value = withRepeat(
      withSequence(
        withTiming(-25, { duration: duration / 2, easing: Easing.inOut(Easing.sin) }),
        withTiming(25, { duration: duration / 2, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );

    // Animación horizontal suave
    translateX.value = withRepeat(
      withSequence(
        withTiming(15, { duration: duration, easing: Easing.inOut(Easing.sin) }),
        withTiming(-15, { duration: duration, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );

    // Rotación constante
    rotateValue.value = withRepeat(
      withTiming(1, { duration: duration * 1.5, easing: Easing.linear }),
      -1,
      false
    );
  }, [duration, translateX, translateY, rotateValue]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { rotate: `${rotateValue.value * 360}deg` },
    ],
  }));

  return (
    <Animated.Text
      style={[
        styles.emoji,
        {
          left: x,
          top: y,
          fontSize: size,
        },
        animatedStyle,
      ]}
      pointerEvents="none"
    >
      {emoji}
    </Animated.Text>
  );
};

export const FondoAnimadoComida = () => {
  const { width, height } = useWindowDimensions();

  // Generar datos de emojis una sola vez por dimensiones
  const emojisData = useMemo(() => {
    const isWeb = Platform.OS === 'web';
    const emojiCount = isWeb ? 25 : 15;
    return Array.from({ length: emojiCount }).map((_, i) => ({
      id: i,
      emoji: FOOD_EMOJIS[Math.floor(Math.random() * FOOD_EMOJIS.length)],
      x: Math.random() * (width - 60),
      y: Math.random() * (height - 60),
      size: isWeb ? (Math.random() * 50 + 30) : (Math.random() * 35 + 20),
      duration: Math.random() * 15000 + 10000,
    }));
  }, [width, height]);

  return (
    <View style={styles.container} pointerEvents="none">
      {emojisData.map((emoji) => (
        <FloatingEmoji
          key={emoji.id}
          emoji={emoji.emoji}
          x={emoji.x}
          y={emoji.y}
          size={emoji.size}
          duration={emoji.duration}
        />
      ))}
    </View>
  );
};