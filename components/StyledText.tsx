//Allows for custom font to be used throughout the app when the react-native text isn't enough

import * as React from 'react';

import { Text, TextProps } from './Themed';

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}

export function MemaBText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'mema-font-bold' }]} />;
}

export function MemaText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'mema-font' }]} />;
}
