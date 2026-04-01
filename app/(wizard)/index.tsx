import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useAuthStore } from '@Global/funcionalidades/auth/useAuthStore';
import { styles } from '@Global/funcionalidades/negocio/wizard.styles';

import { IndicadorProgreso } from '@Global/funcionalidades/negocio/componentes/moleculas/IndicadorProgreso';
import { PasoRestaurante } from '@Global/funcionalidades/negocio/componentes/organismos/PasoRestaurante';
import { PasoPlato } from '@Global/funcionalidades/negocio/componentes/organismos/PasoPlato';
import { PasoImagen } from '@Global/funcionalidades/negocio/componentes/organismos/PasoImagen';
import { ControlesWizard } from '@Global/funcionalidades/negocio/componentes/organismos/ControlesWizard';

export default function WizardNegocio() {
    const router = useRouter();
    const agregarPlato = useAuthStore(state => state.agregarPlato);

    const [pasoActual, setPasoActual] = useState(1);
    const [nombreRestaurante, setNombreRestaurante] = useState('');
    const [nombrePlato, setNombrePlato] = useState('');
    const [imagenUri, setImagenUri] = useState<string | null>(null);

    const seleccionarImagen = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImagenUri(result.assets[0].uri);
        }
    };

    const irSiguiente = () => setPasoActual(prev => Math.min(prev + 1, 3));
    const irAtras = () => setPasoActual(prev => Math.max(prev - 1, 1));

    const finalizarWizard = () => {
        agregarPlato({ nombreRestaurante, nombrePlato, imagenUri });
        router.replace('/(negocio)' as any);
    };

    const siguienteDeshabilitado = (pasoActual === 1 && !nombreRestaurante) || (pasoActual === 2 && !nombrePlato);
    const finalizarDeshabilitado = !imagenUri;

    return (
        <SafeAreaView style={styles.contenedorPadre}>
            <View style={styles.contenedor}>
                
                <IndicadorProgreso pasoActual={pasoActual} totalPasos={3} />

                <View style={styles.contenidoPaso}>
                    {pasoActual === 1 && (
                        <PasoRestaurante 
                            nombreRestaurante={nombreRestaurante} 
                            setNombreRestaurante={setNombreRestaurante} 
                        />
                    )}

                    {pasoActual === 2 && (
                        <PasoPlato 
                            nombrePlato={nombrePlato} 
                            setNombrePlato={setNombrePlato} 
                        />
                    )}

                    {pasoActual === 3 && (
                        <PasoImagen 
                            imagenUri={imagenUri} 
                            seleccionarImagen={seleccionarImagen} 
                        />
                    )}
                </View>

                <ControlesWizard 
                    pasoActual={pasoActual}
                    totalPasos={3}
                    irAtras={irAtras}
                    irSiguiente={irSiguiente}
                    finalizarWizard={finalizarWizard}
                    siguienteDeshabilitado={Boolean(siguienteDeshabilitado)}
                    finalizarDeshabilitado={Boolean(finalizarDeshabilitado)}
                />
            </View>
        </SafeAreaView>
    );
}