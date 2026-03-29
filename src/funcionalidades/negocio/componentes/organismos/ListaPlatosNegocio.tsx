import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from '../../dashboard.styles';
import { TarjetaPlatoNegocio } from '../moleculas/TarjetaPlatoNegocio';

interface ListaPlatosNegocioProps {
    platosNegocio: { nombreRestaurante: string, nombrePlato: string, imagenUri: string | null }[];
}

export const ListaPlatosNegocio = ({ platosNegocio }: ListaPlatosNegocioProps) => {
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
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TarjetaPlatoNegocio 
                            nombreRestaurante={item.nombreRestaurante} 
                            nombrePlato={item.nombrePlato} 
                            imagenUri={item.imagenUri} 
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listaPlatos}
                />
            )}
        </View>
    );
};