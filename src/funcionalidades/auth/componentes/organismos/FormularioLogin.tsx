import { Boton } from '@/src/compartido/componentes/atomos/Boton';
import { InputConError } from '@/src/compartido/componentes/atomos/InputConError';
import React from 'react';
import { View } from 'react-native';
import { TEXTOS_AUTH } from '../../constantes/textos';
import { useAuthForm } from '../../useAuthForm';
import { EnlaceNavegacion } from '../moleculas/EnlaceNavegacion';

interface FormularioLoginProps {
    alHacerSubmit: (email: string) => void;
    alNavegarRegistro: () => void;
}

export const FormularioLogin = ({ alHacerSubmit, alNavegarRegistro }: FormularioLoginProps) => {
    const { email, setEmail, password, setPassword, errores, limpiarError, validar } = useAuthForm();
    const textos = TEXTOS_AUTH.login;

    const handleSubmit = () => {
        if (validar()) {
            alHacerSubmit(email);
        }
    };

    return (
        <View>
            <InputConError
                label={textos.labelEmail}
                placeholder={textos.placeholderEmail}
                value={email}
                onChangeText={(v) => { setEmail(v); limpiarError('email'); }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                error={errores.email}
            />
            <InputConError
                label={textos.labelPassword}
                placeholder={textos.placeholderPassword}
                value={password}
                onChangeText={(v) => { setPassword(v); limpiarError('password'); }}
                secureTextEntry
                error={errores.password}
            />
            <Boton titulo={textos.botonSubmit} onPress={handleSubmit} />
            <EnlaceNavegacion
                textoNormal={textos.textoEnlaceNormal}
                textoResaltado={textos.textoEnlaceBold}
                onPress={alNavegarRegistro}
            />
        </View>
    );
};
