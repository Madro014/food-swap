import React, { useEffect, useMemo } from 'react';
import { Dimensions, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';
import { styles } from './FondoAnimadoComida.styles';

const { width, height } = Dimensions.get('window');

const FOOD_EMOJIS = ['🍔', '🍕', '🌮', '🍩', '🍣', '🍰', '🥑', '🍗', '🍟', '🍲', '🥩', '🥓', '🍳'];

const FloatingFood = ({ emoji, delay, duration, startX, size }: { emoji: string; delay: number; duration: number; startX: number; size: number }) => {
    const translateY = useSharedValue(height + 100);
    const rotateY = useSharedValue(0); // For spinning effect

    useEffect(() => {
        // Float upwards
        translateY.value = withDelay(
            delay,
            withRepeat(
                withTiming(-150, {
                    duration: duration,
                    easing: Easing.linear,
                }),
                -1, // Infinite repeat
                false // Do not reverse (go bottom to top)
            )
        );

        // Spin around
        rotateY.value = withDelay(
            delay,
            withRepeat(
                withTiming(360, {
                    duration: duration * 1.5,
                    easing: Easing.linear,
                }),
                -1, // Infinite repeat
                false
            )
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: translateY.value },
                { rotate: `${rotateY.value}deg` },
            ],
            left: startX,
            fontSize: size,
        };
    });

    return (
        <Animated.Text style={[styles.emoji, animatedStyle]}>
            {emoji}
        </Animated.Text>
    );
};

export const FondoAnimadoComida = () => {
    // Generate random data for emojis only once so it doesn't jump on re-renders
    const floatingEmojis = useMemo(() => {
        const items = [];
        const NUM_EMOJIS = 15;

        for (let i = 0; i < NUM_EMOJIS; i++) {
            const randomEmoji = FOOD_EMOJIS[Math.floor(Math.random() * FOOD_EMOJIS.length)];
            items.push({
                id: i,
                emoji: randomEmoji,
                delay: Math.random() * 5000, // Up to 5 sec delay
                duration: 12000 + Math.random() * 10000, // 12-22 sec duration
                startX: Math.random() * width * 0.9, // Spread across screen width
                size: 25 + Math.random() * 35, // Size between 25 and 60
            });
        }
        return items;
    }, []);

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
                />
            ))}
        </View>
    );
};
