import { Boton } from '@/src/compartido/componentes/atomos/Boton';
import { InputConError } from '@/src/compartido/componentes/atomos/InputConError';
import React from 'react';
import { View } from 'react-native';
import { TEXTOS_AUTH } from '../../constantes/textos';
import { useAuthForm } from '../../useAuthForm';
import { EnlaceNavegacion } from '../moleculas/EnlaceNavegacion';

interface FormularioRegistroProps {
    alHacerSubmit: (nombreCompleto: string) => void;
    alNavegarLogin: () => void;
}

export const FormularioRegistro = ({ alHacerSubmit, alNavegarLogin }: FormularioRegistroProps) => {
    const { nombre, setNombre, email, setEmail, password, setPassword, errores, limpiarError, validar } = useAuthForm(true);
    const textos = TEXTOS_AUTH.registro;

    const handleSubmit = () => {
        if (validar()) {
            alHacerSubmit(nombre);
        }
    };

    return (
        <View>
            <InputConError
                label={textos.labelNombre}
                placeholder={textos.placeholderNombre}
                value={nombre}
                onChangeText={(v) => { setNombre(v); limpiarError('nombre'); }}
                error={errores.nombre}
            />
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
                onPress={alNavegarLogin}
            />
        </View>
    );
};
