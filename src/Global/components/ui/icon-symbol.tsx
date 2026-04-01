// alternativa para usar MaterialIcons en Android y web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * agrega tus mapeos de SF Symbols a Material Icons aqui
 * - consulta Material Icons en la [Guía de iconos](https://icons.expo.fyi)
 * - consulta SF Symbols en la aplicación [SF Symbols](https://developer.apple.com/sf-symbols/)
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'flame.fill': 'whatshot',
  'heart.fill': 'favorite',
  'rectangle.portrait.and.arrow.right': 'logout',
} as IconMapping;

/**
 * un componente de icono que utiliza sf symbols nativos en ios y material icons en android y web
 * esto asegura un aspecto consistente en todas las plataformas y un uso óptimo de recursos
 * los nombres de los iconos (`name`) se basan en sf symbols y requieren un mapeo manual a material icons
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
