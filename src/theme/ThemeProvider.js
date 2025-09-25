import React from 'react';
import { Appearance, NativeModules } from 'react-native';
import Config from 'react-native-config';

// Safe imports with fallbacks

let lightColorsNicaQuizz, darkColorsNicaQuizz;
try {
  const colors = require('../constants/colors');
  lightColorsNicaQuizz = colors.lightColors;
  darkColorsNicaQuizz = colors.darkColors;
} catch {
  console.warn('Failed to import NicaQuizz colors');
}

const { Environment } = NativeModules;

// Default fallback colors
const defaultColors = {
  primary: '#007AFF',
  background: '#FFFFFF',
  text: '#000000',
  card: '#FFFFFF',
  border: '#E5E5EA',
  notification: '#FF3B30',
};

// Create theme configs with safe fallbacks
const createThemeConfig = (light, dark) => ({
  light: light || defaultColors,
  dark: dark || defaultColors,
});

const themeConfigs = {
  nica_quizz: createThemeConfig(lightColorsNicaQuizz, darkColorsNicaQuizz),
};

/**
 * Get the current app environment from multiple sources
 */
const getCurrentAppEnvironment = async () => {
  try {
    // First try to get from native module (from app launcher)
    if (Environment) {
      const nativeEnv = await Environment.getSelectedApp();
      if (nativeEnv && themeConfigs[nativeEnv]) {
        return nativeEnv;
      }
    }
  } catch (error) {
    console.log('Native environment module not available for theme:', error);
  }

  // Fallback to Config.ENV
  const configEnv = Config.ENV;
  if (configEnv && themeConfigs[configEnv]) {
    return configEnv;
  }

  // Final fallback
  return 'demo';
};

const getThemeColors = (env, isDark) => {
  const theme = themeConfigs[env];
  if (!theme) {
    console.warn(`Theme not found for environment: ${env}, using demo theme`);
    return isDark ? themeConfigs.demo.dark : themeConfigs.demo.light;
  }
  return isDark ? theme.dark : theme.light;
};

export const ThemeContext = React.createContext({
  isDark: true,
  colors: defaultColors,
  currentApp: 'demo',
});

export const ThemeProvider = props => {
  const colorScheme = Appearance.getColorScheme();
  const [isDark, setIsDark] = React.useState(colorScheme === 'dark');
  const [currentApp, setCurrentApp] = React.useState('demo');
  const [colors, setColors] = React.useState(defaultColors);

  // Initialize the current app and colors
  React.useEffect(() => {
    const initializeTheme = async () => {
      try {
        const appEnv = await getCurrentAppEnvironment();
        setCurrentApp(appEnv);
        setColors(getThemeColors(appEnv, isDark));
        console.log(`🎨 Theme initialized for app: ${appEnv}`);
      } catch (error) {
        console.error('Failed to initialize theme:', error);
        setCurrentApp('demo');
        setColors(getThemeColors('demo', isDark));
      }
    };

    initializeTheme();
  }, [isDark]);

  // Listen for appearance changes
  React.useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      const newIsDark = colorScheme === 'dark';
      setIsDark(newIsDark);
      setColors(getThemeColors(currentApp, newIsDark));
    });

    return () => subscription.remove();
  }, [currentApp]);

  const defaultTheme = {
    isDark,
    colors,
    currentApp,
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => React.useContext(ThemeContext);
