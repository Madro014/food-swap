import React, { useMemo } from 'react';
import { useWindowDimensions, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';
import { styles } from './FondoAnimadoComida.styles';

const FOOD_EMOJIS = ['🍔', '🍕', '🌮', '🍩', '🍣', '🍰', '🥑', '🍗', '🍟', '🍲', '🥩', '🥓', '🍳'];

// Valores pseudo-aleatorios estables basados en el índice (sin Math.random en render)
function pseudoRandom(seed: number, offset: number): number {
    return ((Math.sin((seed + offset) * 9301 + 49297) * 233280) % 1 + 1) % 1;
}

function generarEmojiConfig(screenWidth: number, screenHeight: number, seed: number) {
    const pr = (o: number) => pseudoRandom(seed, o);
    return {
        emoji: FOOD_EMOJIS[Math.floor(pr(0) * FOOD_EMOJIS.length)],
        delay: pr(1) * 5000,
        duration: 12000 + pr(2) * 10000,
        startX: pr(3) * screenWidth * 0.9,
        size: 25 + pr(4) * 35,
        startY: screenHeight + 100,
    };
}

// Hook personalizado: 'use no memo' le indica al React Compiler que omita la optimización
// de este hook, permitiendo que los sharedValues de Reanimated se muten correctamente.
function useFloatAnimation(startY: number, delay: number, duration: number) {
    'use no memo';
    const translateY = useSharedValue(startY);
    translateY.value = withDelay(
        delay,
        withRepeat(
            withTiming(-150, { duration, easing: Easing.linear }),
            -1,
            false
        )
    );

    const rotateVal = useSharedValue(0);
    rotateVal.value = withDelay(
        delay,
        withRepeat(
            withTiming(360, { duration: duration * 1.5, easing: Easing.linear }),
            -1,
            false
        )
    );

    return { translateY, rotateVal };
}

const FloatingFood = ({
    emoji,
    delay,
    duration,
    startX,
    size,
    startY,
}: {
    emoji: string;
    delay: number;
    duration: number;
    startX: number;
    size: number;
    startY: number;
}) => {
    const { translateY, rotateVal } = useFloatAnimation(startY, delay, duration);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: translateY.value },
            { rotate: `${rotateVal.value}deg` },
        ],
        left: startX,
        fontSize: size,
    }));

    return (
        <Animated.Text style={[styles.emoji, animatedStyle]}>
            {emoji}
        </Animated.Text>
    );
};

export const FondoAnimadoComida = () => {
    const { width, height } = useWindowDimensions();

    const floatingEmojis = useMemo(
        () =>
            Array.from({ length: 15 }, (_, i) => ({
                id: i,
                ...generarEmojiConfig(width, height, i),
            })),
        [width, height]
    );

    return (
        <View style={styles.container} pointerEvents="none">
            {floatingEmojis.map((item) => (
                <FloatingFood
                    key={item.id}
                    emoji={item.emoji}
                    delay={item.delay}
                    duration={item.duration}
                    startX={item.startX}
                    size={item.size}
                    startY={item.startY}
                />
            ))}
        </View>
    );
};