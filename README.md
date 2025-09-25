This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

# Instalación y ejecución inicial

## Requisitos previos
- Node.js y npm instalados
- Android Studio (para emulador Android)
- (Opcional) Dispositivo físico conectado
- (Solo iOS, en Mac) Xcode y CocoaPods

## Instalación de dependencias

Recomendado usar **Yarn**:

```bash
# Linux/macOS
yarn install

# Windows
yarn install
```

Alternativamente puedes usar **npm**:

```bash
# Linux/macOS
npm install

# Windows
npm install
```

## Ejecución del proyecto

### Iniciar Metro Bundler

```bash
# Yarn
yarn start

# npm
npm start
```

### Ejecutar en Android

```bash
# Yarn
yarn android

# npm
npm run android
```

### Ejecutar en iOS

```bash
# Yarn
yarn ios

# npm
npm run ios
```

> **Nota:** Para iOS, asegúrate de instalar las dependencias de CocoaPods:
> 
> ```bash
> cd ios && pod install
> ```

## Pasos para Linux
1. Clona el repositorio:
   ```sh
   git clone <url-del-repo>
   cd nica_quizz-mibile
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Da permisos de ejecución al gradle wrapper:
   ```sh
   chmod +x android/gradlew
   ```
4. Inicia el emulador Android desde Android Studio o conecta tu dispositivo.
5. Ejecuta la app:
   ```sh
   npm run android
   ```

## Pasos para Windows
1. Clona el repositorio:
   ```bat
   git clone <url-del-repo>
   cd nica_quizz-mibile
   ```
2. Instala las dependencias:
   ```bat
   npm install
   ```
3. Inicia el emulador Android desde Android Studio o conecta tu dispositivo.
4. Ejecuta la app:
   ```bat
   npm run android
   ```

## Notas adicionales
- Si es la primera vez que ejecutas el proyecto, la descarga y configuración de dependencias puede tardar varios minutos.
- Si tienes problemas con permisos en Windows, ejecuta la terminal como administrador.
- Para iOS (solo Mac), sigue las instrucciones de CocoaPods incluidas más abajo en este README.
