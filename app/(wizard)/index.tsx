import React, { useState } from 'react';
import { View, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useAuthStore } from '@Global/funcionalidades/auth/useAuthStore';
import { styles } from '@Global/funcionalidades/negocio/wizard.styles';
import { platosService } from '@backend/platosService';

import { IndicadorProgreso } from '@Global/funcionalidades/negocio/componentes/moleculas/IndicadorProgreso';
import { PasoRestaurante } from '@Global/funcionalidades/negocio/componentes/organismos/PasoRestaurante';
import { PasoPlato } from '@Global/funcionalidades/negocio/componentes/organismos/PasoPlato';
import { PasoImagen } from '@Global/funcionalidades/negocio/componentes/organismos/PasoImagen';
import { ControlesWizard } from '@Global/funcionalidades/negocio/componentes/organismos/ControlesWizard';

export default function WizardNegocio() {
    const router = useRouter();
    const { token, userName } = useAuthStore();

    const [pasoActual, setPasoActual] = useState(1);
    const [nombreRestaurante, setNombreRestaurante] = useState(userName || '');
    const [nombrePlato, setNombrePlato] = useState('');
    const [imagenUri, setImagenUri] = useState<string | null>(null);
    const [subiendo, setSubiendo] = useState(false);

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

    const finalizarWizard = async () => {
        if (!token) return;
        setSubiendo(true);
        // Enviamos 0 como precio por ahora ya que el wizard no lo pide
        const desc = "Especialidad de " + nombreRestaurante;
        const result = await platosService.crearPlato(token, nombrePlato, 0, imagenUri, desc);
        setSubiendo(false);

        if (result.success) {
            router.replace('/(negocio)' as any);
        } else {
            console.error("Error al crear plato:", result.message);
        }
    };

    const siguienteDeshabilitado = (pasoActual === 1 && !nombreRestaurante) || (pasoActual === 2 && !nombrePlato);
    const finalizarDeshabilitado = !imagenUri || subiendo;

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
                        <View style={{ flex: 1 }}>
                            <PasoImagen 
                                imagenUri={imagenUri} 
                                seleccionarImagen={seleccionarImagen} 
                            />
                            {subiendo && (
                                <ActivityIndicator size="large" color="#FF4500" style={{marginTop: 20}} />
                            )}
                        </View>
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