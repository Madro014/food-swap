import React, { forwardRef, useImperativeHandle } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

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

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        boxShadow: '0px 0px 0px 9999px rgba(0,0,0,0)',
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emoji: {
        fontSize: 50,
    },
    image: {
        width: 60,
        height: 60,
    }
});
