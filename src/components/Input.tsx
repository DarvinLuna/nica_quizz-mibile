import React, {FC} from 'react';
import {
    View,
    TextInput,
    TextInputProps,
    StyleSheet,
    Text,
    ViewStyle,
    TextStyle,
    Pressable,
} from 'react-native';

import {useTheme} from '../../theme/ThemeProvider';
import {fss, hs, ms} from '../utils';
import {NicaQuizz as Types} from '../types/interfaces';
import {BORDER_RADIUS} from '../constants/utils.ts';

import {Icon} from './Icon.tsx';

interface InputProps extends TextInputProps {
    label?: string;
    leftIcon?: string;
    rightIcon?: string;
    errorMessage?: string;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    iconStyle?: TextStyle;
    labelStyle?: TextStyle;
    errorStyle?: TextStyle;
    onLeftIconPress?: () => void;
    onRightIconPress?: () => void;
    onChangeText: (text: string) => void;
}

const Input: FC<InputProps> = ({
                                   label,
                                   leftIcon,
                                   rightIcon,
                                   errorMessage,
                                   containerStyle,
                                   inputStyle,
                                   iconStyle,
                                   labelStyle,
                                   errorStyle,
                                   onLeftIconPress,
                                   onRightIconPress,
                                   ...props
                               }) => {
    const {colors} = useTheme();
    const styles = makeStyle(
        colors,
        containerStyle,
        inputStyle,
        iconStyle,
        labelStyle,
        errorStyle,
    );
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.inputContainer}>
                {leftIcon && (
                    <Pressable
                        onPress={onLeftIconPress}
                        style={({pressed}) => [
                            styles.iconContainer,
                            pressed && styles.iconPressed,
                        ]}
                        accessibilityRole="button"
                        accessibilityLabel="left icon">
                        <Icon
                            icon={leftIcon}
                            color={colors.primaryText}
                            size={fss(20)}
                            style={styles.icon}
                        />
                    </Pressable>
                )}
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#666"
                    {...props}
                    accessibilityLabel={props.placeholder}
                />
                {rightIcon && (
                    <Pressable
                        onPress={onRightIconPress}
                        style={({pressed}) => [
                            styles.iconContainer,
                            pressed && styles.iconPressed,
                        ]}
                        accessibilityRole="button"
                        accessibilityLabel="right icon">
                        <Icon
                            icon={rightIcon}
                            color={colors.primaryText}
                            size={fss(20)}
                            style={styles.icon}
                        />
                    </Pressable>
                )}
            </View>
            {errorMessage && (
                <Text style={styles.errorMessage} accessibilityLiveRegion="polite">
                    {errorMessage ?? ''}
                </Text>
            )}
        </View>
    );
};

const makeStyle = (
    colors: Types.ThemeColors,
    containerStyle?: ViewStyle,
    inputStyles?: TextStyle,
    labelStyles?: TextStyle,
    iconStyles?: TextStyle,
    errorStyles?: TextStyle,
) =>
    StyleSheet.create({
        container: {
            gap: hs(8),
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.primary,
            borderRadius: BORDER_RADIUS,
            paddingHorizontal: hs(10),
            ...containerStyle,
        },
        input: {
            flex: 1,
            fontSize: fss(14),
            color: colors.primaryText,
            height: 'auto',
            fontFamily: 'Montserrat-Regular',
            ...inputStyles,
        },
        iconContainer: {
            padding: ms(8),
        },
        icon: {
            color: colors.primaryText,
            ...iconStyles,
        },
        iconPressed: {
            opacity: ms(0.6),
        },
        label: {
            fontSize: fss(14),
            color: colors.primaryText,
            fontFamily: 'Montserrat-Bold',
            ...labelStyles,
        },
        errorMessage: {
            color: colors.red,
            fontSize: fss(14),
            ...errorStyles,
        },
    });

export default Input;