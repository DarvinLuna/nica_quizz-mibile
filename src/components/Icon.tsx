import React, { FC } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

import { fss } from '../utils';
import { NicaQuizz as Types } from '../types/interfaces';

interface IconProps {
  icon: string;
  color?: Types.ThemeColorKey;
  size?: number;
  style?: TextStyle;
}

export const Icon: FC<IconProps> = ({ icon, color, size, style }) => {
  const styles = makeStyles(color, size, style);
  // @ts-ignoreS
  return <Text style={styles.icon}>{icon}</Text>;
};

const makeStyles = (
  color?: Types.ThemeColorKey,
  size?: number,
  style?: TextStyle,
) =>
  StyleSheet.create({
    icon: {
      color: color,
      fontSize: fss(size || 20),
      fontFamily: 'nova-icons',
      ...style,
    },
  });
