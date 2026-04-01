import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { styles } from './InputConError.styles';

interface InputConErrorProps extends TextInputProps {
    label: string;
    error?: string;
}

export function InputConError({ label, error, style, ...props }: InputConErrorProps) {
    return (
        <View style={styles.group}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, error ? styles.inputError : null, style]}
                placeholderTextColor="#9BA1A6"
                {...props}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
}