import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { styles } from './InputConError.styles';

interface InputConErrorProps extends TextInputProps {
    label: string;
    error?: string;
    leftIcon?: React.ReactNode;
}

export function InputConError({ label, error, leftIcon, style, onFocus, onBlur, ...props }: InputConErrorProps) {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
        <View style={styles.group}>
            <Text style={[styles.label, isFocused && styles.labelFocused]}>{label}</Text>
            <View style={[
                styles.inputContainer, 
                isFocused && styles.inputContainerFocused,
                error ? styles.inputError : null
            ]}>
                {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
                <TextInput
                    style={[styles.input, leftIcon ? { paddingLeft: 10 } : null, style]}
                    placeholderTextColor="#A8A39F"
                    onFocus={(e) => {
                        setIsFocused(true);
                        onFocus && onFocus(e);
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        onBlur && onBlur(e);
                    }}
                    {...props}
                />
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
}