import React from 'react';
import {Text, StyleSheet, Pressable, ViewStyle} from 'react-native';

import {useTheme} from '../../theme/ThemeProvider';
import {fss, ms} from '../../utils';
import {FutecAttendance as Types} from '../types/interfaces';

interface BackButtonProps {
    navigation: {
        goBack: () => void;
    };
    style?: ViewStyle;
}

const BackButton: React.FC<BackButtonProps> = ({navigation, style}) => {
    const {colors} = useTheme();
    const styles = makeStyles(colors, style);
    return (
        <Pressable testID={'backButton'} onPress={() => navigation.goBack()}>
            <Text style={styles.icon}></Text>
        </Pressable>
    );
};

export default BackButton;

const makeStyles = (colors: Types.ThemeColors, style?: ViewStyle) =>
    StyleSheet.create({
        icon: {
            fontFamily: 'nova-icons',
            fontSize: fss(20),
            color: colors.primary,
            padding: ms(8),
            borderRadius: 100,
            backgroundColor: colors.shadow,
            ...style,
        },
    });