import { Boton } from '@Global/compartido/componentes/atomos/Boton';
import { InputConError } from '@Global/compartido/componentes/atomos/InputConError';
import { IconSymbol } from '@Global/components/ui/icon-symbol';
import * as ImagePicker from 'expo-image-picker';
import React, { useReducer } from 'react';
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './FormularioPlato.styles';

interface FormState {
    nombreRestaurante: string;
    nombrePlato: string;
    precio: string;
    imagenUri: string | null;
    descripcion: string;
    errores: {
        nombreRestaurante: string;
        nombrePlato: string;
        precio: string;
        imagenUri: string;
        descripcion: string;
    };
}

type FormAction =
    | { type: 'SET_FIELD'; field: keyof Omit<FormState, 'errores'>; value: any }
    | { type: 'SET_ERROR'; field: string; value: string }
    | { type: 'SET_ERRORS'; errores: FormState['errores'] }
    | { type: 'CLEAR_FIELD_ERROR'; field: string };

function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.field]: action.value, errores: { ...state.errores, [action.field]: '' } };
        case 'SET_ERROR':
            return { ...state, errores: { ...state.errores, [action.field]: action.value } };
        case 'SET_ERRORS':
            return { ...state, errores: action.errores };
        case 'CLEAR_FIELD_ERROR':
            return { ...state, errores: { ...state.errores, [action.field]: '' } };
        default:
            return state;
    }
}

interface FormularioPlatoProps {
    nombreRestauranteInicial?: string;
    alHacerSubmit: (data: {
        nombreRestaurante: string;
        nombrePlato: string;
        precio: number;
        imagenUri: string;
        descripcion: string;
    }) => Promise<void>;
    alCancelar: () => void;
    cargando?: boolean;
}

export const FormularioPlato = ({ nombreRestauranteInicial = '', alHacerSubmit, alCancelar, cargando = false }: FormularioPlatoProps) => {
    const [state, dispatch] = useReducer(formReducer, {
        nombreRestaurante: nombreRestauranteInicial,
        nombrePlato: '',
        precio: '',
        imagenUri: null,
        descripcion: '',
        errores: {
            nombreRestaurante: '',
            nombrePlato: '',
            precio: '',
            imagenUri: '',
            descripcion: ''
        }
    });

    const { nombreRestaurante, nombrePlato, precio, imagenUri, descripcion, errores } = state;

    const seleccionarImagen = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            dispatch({ type: 'SET_FIELD', field: 'imagenUri', value: result.assets[0].uri });
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

        dispatch({ type: 'SET_ERRORS', errores: nuevosErrores });
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

    const placeholderIcon = 'https://res.cloudinary.com/dzdgdqoap/image/upload/v1775621191/Ícono_de_carga_temático_de_comida_hjuvap.png';

    return (
        <View style={styles.tarjetaFormulario}>
            {/* ── Header decorativo ── */}
            <View style={styles.headerDecoativo}>
                <View style={styles.emojiBadge}>
                    <Text style={styles.emojiTexto}>🍳</Text>
                </View>
                <Text style={styles.titulo}>Nuevo Manjar</Text>
                <Text style={styles.subtitulo}>Comparte tu mejor creación con la comunidad</Text>
            </View>

            <View style={styles.separador} />

            {/* ── Campos del formulario ── */}
            <InputConError
                label="Nombre del Restaurante"
                placeholder="madrinhos pizza"
                value={nombreRestaurante}
                onChangeText={(v) => dispatch({ type: 'SET_FIELD', field: 'nombreRestaurante', value: v })}
                error={errores.nombreRestaurante}
                leftIcon={<IconSymbol name="house.fill" size={18} color="#A89E96" />}
            />

            <View style={styles.filaInputs}>
                <View>
                    <InputConError
                        label="Nombre del Plato"
                        placeholder="Ej. Pizza de Queso Cabrales"
                        value={nombrePlato}
                        onChangeText={(v) => dispatch({ type: 'SET_FIELD', field: 'nombrePlato', value: v })}
                        error={errores.nombrePlato}
                        leftIcon={<IconSymbol name="fork.knife" size={18} color="#A89E96" />}
                    />
                </View>

                <View>
                    <InputConError
                        label="Precio"
                        placeholder="0.00"
                        value={precio}
                        onChangeText={(v) => dispatch({ type: 'SET_FIELD', field: 'precio', value: v })}
                        keyboardType="numeric"
                        error={errores.precio}
                        leftIcon={<IconSymbol name="dollarsign" size={18} color="#A89E96" />}
                    />
                </View>
            </View>

            <View style={styles.separador} />

            {/* ── Imagen ── */}
            <View>
                <Text style={styles.labelImagen}>IMAGEN DEL PLATO (OBLIGATORIA)</Text>
                <TouchableOpacity
                    style={[styles.botonImagen, errores.imagenUri ? { borderColor: '#D93545' } : {}]}
                    onPress={seleccionarImagen}
                    activeOpacity={0.7}
                >
                    {imagenUri ? (
                        <>
                            <Image source={{ uri: imagenUri }} style={styles.imagenPreview} />
                            <View style={styles.botonOverlay}>
                                <Text style={styles.textoBotonOverlay}>Cambiar</Text>
                            </View>
                        </>
                    ) : (
                        <View style={styles.placeholderImagenContenedor}>
                            <Image 
                                source={{ uri: placeholderIcon }} 
                                style={[styles.iconoCarga, { width: 40, height: 40, marginBottom: 8 }]} 
                                resizeMode="contain"
                            />
                            <Text style={styles.textoPlaceholder}>Seleccionar Foto del Plato</Text>
                            <Text style={styles.textoPista}>Arrastra y suelta o haz clic para subir tu foto (Máx 5MB)</Text>
                        </View>
                    )}
                </TouchableOpacity>
                {errores.imagenUri ? <Text style={styles.textoError}>{errores.imagenUri}</Text> : null}
            </View>

            {/* ── Descripción ── */}
            <View style={styles.inputDescripcion}>
                <Text style={styles.label}>DESCRIPCIÓN</Text>
                <TextInput
                    style={[styles.areaTexto, errores.descripcion ? { borderColor: '#D93545' } : {}]}
                    placeholder="Cuéntanos qué hace especial a este plato..."
                    placeholderTextColor="#B0A8A0"
                    multiline
                    numberOfLines={4}
                    value={descripcion}
                    onChangeText={(v) => dispatch({ type: 'SET_FIELD', field: 'descripcion', value: v })}
                    maxLength={500}
                />
                <Text style={styles.contadorCaracteres}>{descripcion.length} / 500</Text>
                {errores.descripcion ? <Text style={[styles.textoError, { marginTop: 4 }]}>{errores.descripcion}</Text> : null}
            </View>

            <View style={styles.separador} />

            {/* ── Botones ── */}
            <View style={styles.botonesContenedor}>
                <Boton
                    titulo={cargando ? 'Subiendo...' : 'Subir Plato'}
                    onPress={() => { handleSubmit(); }}
                    disabled={cargando}
                />
                
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
