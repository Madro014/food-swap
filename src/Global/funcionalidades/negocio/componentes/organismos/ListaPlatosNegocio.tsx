import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from '../../dashboard.styles';
import { TarjetaPlatoNegocio } from '../moleculas/TarjetaPlatoNegocio';

interface PlatoDashboard {
    id: string;
    nombreRestaurante: string;
    nombrePlato: string;
    imagenUri: string | null;
}

interface ListaPlatosNegocioProps {
    platosNegocio: PlatoDashboard[];
    onEliminarPlato?: (id: string) => void;
}

export const ListaPlatosNegocio = ({ platosNegocio = [], onEliminarPlato }: ListaPlatosNegocioProps) => {
    return (
        <View style={styles.contenedorContenido}>
            <View style={styles.cabeceraLista}>
                <Text style={styles.tituloSeccion}>Mis Platos Subidos</Text>
                <Text style={styles.subtituloSeccion}>Un total de {platosNegocio.length}</Text>
            </View>

            {platosNegocio.length === 0 ? (
                <View style={styles.estadoVacio}>
                    <Text style={styles.textoVacio}>No tienes platos subidos aún.</Text>
                </View>
            ) : (
                <FlatList
                    data={platosNegocio}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TarjetaPlatoNegocio 
                            id={item.id}
                            nombreRestaurante={item.nombreRestaurante} 
                            nombrePlato={item.nombrePlato} 
                            imagenUri={item.imagenUri} 
                            onEliminar={onEliminarPlato}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listaPlatos}
                />
            )}
        </View>
    );
};