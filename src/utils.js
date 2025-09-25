import { Dimensions, PixelRatio } from 'react-native';
import { BaseToast, ErrorToast } from 'react-native-toast-message';
import React, { useEffect, useState } from 'react';
import { addEventListener } from '@react-native-community/netinfo';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

/**
 * # Height Scale
 *
 * This function scales a given size based on the screen width and a guideline base width.
 * It is useful for making sizes responsive in React Native applications.
 *
 * @param {number} size - The size to be scaled based on the screen width. Typically in dp (density-independent pixels).
 *
 * @returns {number} - The scaled size based on the current screen width.
 *
 * @example
 * // If the guidelineBaseWidth is 375 and the screen width is 500,
 * // calling hs(10) would scale the size to 13.33.
 * const scaledValue = hs(10);
 * @notes
 * - Make sure to set the guidelineBaseWidth properly for consistent scaling.
 * - This function is intended for responsive layouts in React Native.
 */
export const hs = size => (width / guidelineBaseWidth) * size;

/**
 * # Vertical Scale
 *
 * This function scales a given size based on the screen height and a guideline base height.
 * It is useful for making sizes responsive in React Native applications.
 *
 * @param {number} size - The size to be scaled based on the screen height. Typically in dp (density-independent pixels).
 *
 * @returns {number} - The scaled size based on the current screen height.
 *
 * @example
 * // If the guidelineBaseHeight is 812 and the screen height is 1000,
 * // calling vs(10) would scale the size to 12.32.
 * const scaledValue = vs(10);
 * @notes
 * - Make sure to set the guidelineBaseHeight properly for consistent scaling.
 * - This function is intended for responsive layouts in React Native.
 */
export const vs = size => (height / guidelineBaseHeight) * size;

/**
 * # Font Scale
 *
 * This function scales a given font size based on the screen dimensions and a guideline base size.
 * It is useful for making font sizes responsive in React Native applications.
 *
 * @param {number} size - The font size to be scaled. Typically in dp (density-independent pixels).
 *
 * @returns {number} - The scaled font size based on the current screen dimensions.
 *
 * @example
 * // If the guidelineBaseWidth is 375 and the screen width is 500,
 * // and the guidelineBaseHeight is 812 and the screen height is 1000,
 * // calling fss(16) would scale the font size accordingly.
 * const scaledFontSize = fss(16);
 * @notes
 * - Make sure to set the guidelineBaseWidth and guidelineBaseHeight properly for consistent scaling.
 * - This function is intended for responsive font sizes in React Native.
 */
export const fss = size => {
  const scale = Math.min(
    width / guidelineBaseWidth,
    height / guidelineBaseHeight,
  );
  return Math.round(size * scale * PixelRatio.getFontScale());
};

/**
 * # Margin Scale
 *
 * This function scales a given margin size based on the screen width and a guideline base width, with an optional factor.
 * It is useful for making margin sizes responsive in React Native applications.
 *
 * @param {number} size - The margin size to be scaled. Typically in dp (density-independent pixels).
 * @param {number} [factor=0.5] - The factor to adjust the scaling. Default is 0.5.
 *
 * @returns {number} - The scaled margin size based on the current screen width and the factor.
 *
 * @example
 * // If the guidelineBaseWidth is 375 and the screen width is 500,
 * // calling ms(10) with the default factor would scale the margin size to 11.67.
 * const scaledMargin = ms(10);
 * @notes
 * - Make sure to set the guidelineBaseWidth properly for consistent scaling.
 * - This function is intended for responsive margin sizes in React Native.
 */
export const ms = (size, factor = 0.5) => size + (hs(size) - size) * factor;

export const months = [
  { label: 'ENERO', value: 1 },
  { label: 'FEBRERO', value: 2 },
  { label: 'MARZO', value: 3 },
  { label: 'ABRIL', value: 4 },
  { label: 'MAYO', value: 5 },
  { label: 'JUNIO', value: 6 },
  { label: 'JULIO', value: 7 },
  { label: 'AGOSTO', value: 8 },
  { label: 'SEPTIEMBRE', value: 9 },
  { label: 'OCTUBRE', value: 10 },
  { label: 'NOVIEMBRE', value: 11 },
  { label: 'DICIEMBRE', value: 12 },
];

export const years = [
  {
    label: String(new Date().getFullYear() - 1),
    value: new Date().getFullYear() - 1,
  },
  { label: String(new Date().getFullYear()), value: new Date().getFullYear() },
  {
    label: String(new Date().getFullYear() + 1),
    value: new Date().getFullYear() + 1,
  },
];

export const setUpToastConfig = (colors, cardColor, textColor) => {
  return {
    error: props => (
      <ErrorToast
        {...props}
        style={{
          width: '95%',
          height: 'auto',
          borderLeftColor: colors.red,
          borderLeftWidth: ms(5),
          backgroundColor: cardColor,
        }}
        contentContainerStyle={{
          paddingHorizontal: ms(10),
          paddingVertical: ms(5),
        }}
        text1Style={{
          fontSize: fss(15),
          color: colors.red,
        }}
        text2Style={{
          fontSize: fss(14),
          color: textColor,
        }}
        text2NumberOfLines={4}
      />
    ),
    success: props => (
      <BaseToast
        {...props}
        style={{
          width: '95%',
          height: 'auto',
          borderLeftColor: colors.green,
          borderLeftWidth: ms(5),
          backgroundColor: cardColor,
        }}
        contentContainerStyle={{
          paddingHorizontal: ms(10),
          paddingVertical: ms(5),
        }}
        text1Style={{
          fontSize: fss(15),
          color: colors.green,
        }}
        text2Style={{
          fontSize: fss(14),
          color: textColor,
        }}
        text2NumberOfLines={4}
      />
    ),
  };
};

/**
 * # useNetStatus
 *
 * This hook returns the current network connection status.
 * It is useful for determining if the device is connected to the internet in React Native applications.
 * @returns {boolean} - The current network connection status. `true` if connected, `false` otherwise.
 *
 * @example
 * // To use the useNetStatus hook:
 * const isConnected = useNetStatus();
 * if (isConnected) {
 *   console.log('Device is connected to the internet');
 * } else {
 *   console.log('Device is not connected to the internet');
 * }
 * @notes
 * - This hook uses the `@react-native-community/netinfo` library to listen for network status changes.
 * - Make sure to handle the cleanup of the event listener to avoid memory leaks.
 */
export const useNetStatus = () => {
  const [connection, setConnection] = useState(false);

  useEffect(() => {
    const unsubscribe = addEventListener(state => {
      setConnection(state.isConnected ?? false);
    });

    return () => unsubscribe();
  }, []);

  return connection;
};
