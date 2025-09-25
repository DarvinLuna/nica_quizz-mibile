import { DarkTheme, DefaultTheme } from '@react-navigation/native';

import { NicaQuizz as Types } from '../types/interfaces';

const colors = {
  blue: '#16569A',
  white: '#FFFFFF',
  black: '#1c1c1c',
  red: '#FD3658',
  green: '#48D761',
  darkGray: '#262626',
  gray: '#3d3d3e',
  lightGray: '#f1f1f1',
};

export const lightColors: Types.ThemeColors = {
  ...DefaultTheme.colors,
  primary: colors.blue,
  primaryText: colors.black,
  background: colors.white,
  disabled: colors.gray,
  shadow: colors.lightGray,
  red: colors.red,
  green: colors.green,
  white: colors.white,
};

export const darkColors: Types.ThemeColors = {
  ...DarkTheme.colors,
  primary: colors.blue,
  primaryText: colors.white,
  background: colors.black,
  disabled: colors.gray,
  shadow: colors.darkGray,
  red: colors.red,
  green: colors.green,
  white: colors.white,
};
