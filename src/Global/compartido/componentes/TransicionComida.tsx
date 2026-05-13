import React, { forwardRef, useImperativeHandle } from 'react';
import { Image, Text, View } from 'react-native';
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { styles } from './TransicionComida.styles';

export interface TransicionComidaRef {
    iniciar: (onComplete: () => void) => void;
}

export const TransicionComida = forwardRef<TransicionComidaRef, { imageUrl?: string; emoji?: string; color: string }>((props, ref) => {
    const scale = useSharedValue(0);

    useImperativeHandle(ref, () => ({
        iniciar: (onComplete) => {
            // Start scaling up massively
            scale.value = withTiming(
                40, // Needs to be big enough to cover the screen (100 * 40 = 4000px)
                { duration: 800, easing: Easing.inOut(Easing.ease) },
                (finished) => {
                    if (finished) {
                        runOnJS(onComplete)();
                    }
                }
            );
        },
    }));

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
            opacity: scale.value > 0 ? 1 : 0,
        };
    });

    return (
        <Animated.View style={[styles.container, animatedStyle]} pointerEvents="none">
            <View style={[styles.circle, { backgroundColor: props.color }]}>
                {props.imageUrl ? (
                    <Image source={{ uri: props.imageUrl }} style={styles.image} resizeMode="contain" />
                ) : (
                    <Text style={styles.emoji}>{props.emoji}</Text>
                )}
            </View>
        </Animated.View>
    );
});

TransicionComida.displayName = 'TransicionComida';
