// Componente de iconos cross-platform:
// - iOS: usa SymbolView (SF Symbols nativos) vía expo-symbols
// - Android/Web: usa MaterialIcons vía @react-native-vector-icons/material-icons
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, Platform, type StyleProp, type ViewStyle, type TextStyle } from 'react-native';

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
  'xmark': 'close',
  'info.circle': 'info',
  'plus': 'add',
  // Business navbar icons
  'square.grid.2x2.fill': 'grid-view',
  'plus.circle.fill': 'add-circle',
  'plus.circle': 'add-circle-outline',
  'list.bullet': 'format-list-bulleted',
  'tray.full.fill': 'inbox',
  // Form icons
  'fork.knife': 'restaurant',
  'dollarsign': 'attach-money',
  'camera.fill': 'camera-alt',
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
  weight = 'regular',
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle & TextStyle>;
  weight?: SymbolWeight;
}) {
  if (Platform.OS === 'ios') {
    return (
      <SymbolView
        name={name}
        weight={weight}
        tintColor={color as string}
        resizeMode="scaleAspectFit"
        style={[{ width: size, height: size }, style]}
      />
    );
  }

  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
