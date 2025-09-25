import React, {FC} from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

import {useTheme} from '../theme/ThemeProvider';
import {fss, hs, ms, vs} from '../utils';
import {NicaQuizz as Types} from '../types/interfaces';
import {BORDER_RADIUS} from '../constants/utils';

interface ButtonProps extends PressableProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
  outline?: boolean;
}

const Button: FC<ButtonProps> = ({
  label,
  onPress,
  disabled = false,
  outline = false,
  buttonStyle,
  textStyle,
  accessibilityLabel,
  ...props
}) => {
  const {colors, isDark} = useTheme();
  const styles = makeStyles(colors, isDark, buttonStyle, textStyle, outline);
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        pressed && styles.pressedButton,
        disabled && styles.disabledButton,
      ]}
      {...props}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || label}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
};

const makeStyles = (
  colors: Types.ThemeColors,
  isDark: boolean,
  buttonStyle?: ViewStyle,
  textStyle?: TextStyle,
  outline?: boolean,
) =>
  StyleSheet.create({
    button: {
      backgroundColor: outline ? 'transparent' : colors.primary,
      paddingVertical: vs(15),
      paddingHorizontal: hs(20),
      borderRadius: BORDER_RADIUS,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: colors.primary,
      borderWidth: outline ? 1 : 0,
      ...buttonStyle,
    },
    pressedButton: {
      opacity: ms(0.6),
    },
    disabledButton: {
      backgroundColor: colors.disabled,
    },
    text: {
      color: outline
        ? colors.primaryText
        : isDark
        ? colors.primaryText
        : colors.background,
      fontSize: fss(14),
      fontFamily: 'Montserrat-Bold',
      ...textStyle,
    },
  });

export default Button;