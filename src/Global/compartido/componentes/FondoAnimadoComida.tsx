import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, useWindowDimensions } from 'react-native';
import { styles } from './FondoAnimadoComida.styles';

// Lista de emojis de comida
const FOOD_EMOJIS = ['🍕', '🍔', '🌮', '🥗', '🍣', '🍜', '🥘', '🍝', '🥑', '🍓', '🍒', '🥝', '🍊', '🍋', '🍎', '🥦', '🌽', '🥕', '🧀', '🥚', '🍳', '🥞', '🍩', '🎂', '🍪', '🍫', '🍬', '🍭', '🍮', '🍯', '🧁'];

interface FloatingEmojiData {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  translateY: Animated.Value;
  translateX: Animated.Value;
  rotateValue: Animated.Value;
}

export const FondoAnimadoComida = () => {
  const { width, height } = useWindowDimensions();
  const [emojis, setEmojis] = useState<FloatingEmojiData[]>([]);
  const animationsRef = useRef<Animated.CompositeAnimation[]>([]);

  useEffect(() => {
    // Crear emojis flotantes - cantidad adaptativa según tamaño de pantalla
    const emojiCount = 15;
    const newEmojis: FloatingEmojiData[] = [];

    for (let i = 0; i < emojiCount; i++) {
      const size = Math.random() * 35 + 20; // 20-55px
      const startX = Math.random() * (width - 40);
      const startY = Math.random() * (height - 40);
      
      const emojiData: FloatingEmojiData = {
        id: i,
        emoji: FOOD_EMOJIS[Math.floor(Math.random() * FOOD_EMOJIS.length)],
        x: startX,
        y: startY,
        size: size,
        duration: Math.random() * 15000 + 10000, // 10-25 segundos
        translateY: new Animated.Value(0),
        translateX: new Animated.Value(0),
        rotateValue: new Animated.Value(0),
      };

      newEmojis.push(emojiData);

      // Configurar animaciones para cada emoji
      const floatAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(emojiData.translateY, {
            toValue: -25,
            duration: emojiData.duration / 2,
            useNativeDriver: true,
          }),
          Animated.timing(emojiData.translateY, {
            toValue: 25,
            duration: emojiData.duration / 2,
            useNativeDriver: true,
          }),
        ])
      );

      const horizontalAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(emojiData.translateX, {
            toValue: 15,
            duration: emojiData.duration,
            useNativeDriver: true,
          }),
          Animated.timing(emojiData.translateX, {
            toValue: -15,
            duration: emojiData.duration,
            useNativeDriver: true,
          }),
        ])
      );

      const rotationAnimation = Animated.loop(
        Animated.timing(emojiData.rotateValue, {
          toValue: 1,
          duration: emojiData.duration * 1.5,
          useNativeDriver: true,
        })
      );

      floatAnimation.start();
      horizontalAnimation.start();
      rotationAnimation.start();
      
      animationsRef.current.push(floatAnimation, horizontalAnimation, rotationAnimation);
    }

    setEmojis(newEmojis);

    return () => {
      animationsRef.current.forEach(animation => animation.stop());
      animationsRef.current = [];
    };
  }, [width, height]);

  const getRotationInterpolation = (rotateValue: Animated.Value) => {
    return rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
  };

  return (
    <View style={styles.container} pointerEvents="none">
      {emojis.map((emoji) => (
        <Animated.Text
          key={emoji.id}
          style={[
            styles.emoji,
            {
              left: emoji.x,
              top: emoji.y,
              fontSize: emoji.size,
              transform: [
                { translateY: emoji.translateY },
                { translateX: emoji.translateX },
                { rotate: getRotationInterpolation(emoji.rotateValue) },
              ],
            },
          ]}
          pointerEvents="none"
        >
          {emoji.emoji}
        </Animated.Text>
      ))}
    </View>
  );
};