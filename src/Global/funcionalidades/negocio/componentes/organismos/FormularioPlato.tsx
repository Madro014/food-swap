import { Boton } from '@Global/compartido/componentes/atomos/Boton';
import { InputConError } from '@Global/compartido/componentes/atomos/InputConError';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './FormularioPlato.styles';

interface FormularioPlatoProps {
    nombreRestauranteInicial?: string;
    alHacerSubmit: (data: {
        nombreRestaurante: string;
        nombrePlato: string;
        precio: number;
        imagenUri: string;
        descripcion: string;
    }) => Promise<void>;
    alCancelar: () => void; // <-- Nueva prop para manejar la salida
    cargando?: boolean;
}

export const FormularioPlato = ({ nombreRestauranteInicial = '', alHacerSubmit, alCancelar, cargando = false }: FormularioPlatoProps) => {
    const [nombreRestaurante, setNombreRestaurante] = useState(nombreRestauranteInicial);
    const [nombrePlato, setNombrePlato] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagenUri, setImagenUri] = useState<string | null>(null);
    const [descripcion, setDescripcion] = useState('');

    // Estado de errores
    const [errores, setErrores] = useState({
        nombreRestaurante: '',
        nombrePlato: '',
        precio: '',
        imagenUri: '',
        descripcion: ''
    });

    const seleccionarImagen = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImagenUri(result.assets[0].uri);
            setErrores(prev => ({ ...prev, imagenUri: '' }));
        }
    };

    const validar = () => {
        const nuevosErrores = {
            nombreRestaurante: !nombreRestaurante ? 'El nombre del restaurante es obligatorio' : '',
            nombrePlato: !nombrePlato ? 'El nombre del plato es obligatorio' : '',
            precio: !precio || isNaN(Number(precio)) ? 'Ingresa un precio válido' : '',
            imagenUri: !imagenUri ? 'La imagen del plato es obligatoria' : '',
            descripcion: !descripcion ? 'Agrega una descripción para tentar a tus clientes' : ''
        };

        setErrores(nuevosErrores);
        return !Object.values(nuevosErrores).some(error => error !== '');
    };

    const handleSubmit = async () => {
        if (validar()) {
            await alHacerSubmit({
                nombreRestaurante,
                nombrePlato,
                precio: Number(precio),
                imagenUri: imagenUri!,
                descripcion
            });
        }
    };

    return (
        <View style={styles.contenedor}>
            <Text style={styles.titulo}>Nuevo Manjar</Text>
            <Text style={styles.subtitulo}>Comparte tu mejor creación con la comunidad</Text>

            <InputConError
                label="Nombre del Restaurante"
                placeholder="Ej. La Brasa Ardiente"
                value={nombreRestaurante}
                onChangeText={(v) => { setNombreRestaurante(v); setErrores(p => ({ ...p, nombreRestaurante: '' })); }}
                error={errores.nombreRestaurante}
            />

            <InputConError
                label="Nombre del Plato"
                placeholder="Ej. Pizza de Queso Cabrales"
                value={nombrePlato}
                onChangeText={(v) => { setNombrePlato(v); setErrores(p => ({ ...p, nombrePlato: '' })); }}
                error={errores.nombrePlato}
            />

            <InputConError
                label="Precio"
                placeholder="0.00"
                value={precio}
                onChangeText={(v) => { setPrecio(v); setErrores(p => ({ ...p, precio: '' })); }}
                keyboardType="numeric"
                error={errores.precio}
            />

            <View>
                <Text style={styles.labelImagen}>Imagen del Plato (Obligatoria)</Text>
                <TouchableOpacity
                    style={[styles.botonImagen, errores.imagenUri ? { borderColor: '#d63031' } : {}]}
                    onPress={seleccionarImagen}
                    activeOpacity={0.7}
                >
                    {imagenUri ? (
                        <>
                            <Image source={{ uri: imagenUri }} style={styles.imagenPreview} />
                            <View style={styles.botonOverlay}>
                                <Text style={styles.textoBotonOverlay}>Cambiar Imagen</Text>
                            </View>
                        </>
                    ) : (
                        <View style={styles.placeholderImagenContenedor}>
                            <Image
                                source={{ uri: 'https://res.cloudinary.com/dzdgdqoap/image/upload/v1775621191/Ícono_de_carga_temático_de_comida_hjuvap.png' }}
                                style={styles.iconoCarga}
                            />
                            <Text style={styles.textoPlaceholder}>Seleccionar Foto del Plato</Text>
                        </View>
                    )}
                </TouchableOpacity>
                {errores.imagenUri ? <Text style={styles.textoError}>{errores.imagenUri}</Text> : null}
            </View>

            <View style={styles.inputDescripcion}>
                <Text style={styles.label}>Descripción</Text>
                <TextInput
                    style={[styles.areaTexto, errores.descripcion ? { borderColor: '#d63031' } : {}]}
                    placeholder="Cuéntanos qué hace especial a este plato..."
                    placeholderTextColor="#8b7e74"
                    multiline
                    numberOfLines={4}
                    value={descripcion}
                    onChangeText={(v) => { setDescripcion(v); setErrores(p => ({ ...p, descripcion: '' })); }}
                />
                {errores.descripcion ? <Text style={[styles.textoError, { marginTop: 4 }]}>{errores.descripcion}</Text> : null}
            </View>

            {/* Contenedor actualizado para los botones */}
            <View style={styles.botonesContenedor}>
                <Boton
                    titulo={cargando ? 'Guardando Creación...' : 'Subir Plato'}
                    onPress={() => { handleSubmit(); }}
                    disabled={cargando}
                />
                
                {/* Nuevo botón de salida */}
                <TouchableOpacity 
                    style={styles.botonCancelar} 
                    onPress={alCancelar}
                    disabled={cargando}
                >
                    <Text style={styles.textoCancelar}>Cancelar y volver</Text>
                </TouchableOpacity>
            </View>

            {cargando && <ActivityIndicator size="small" color="#FF6B35" style={{ marginTop: 12 }} />}
        </View>
    );
};