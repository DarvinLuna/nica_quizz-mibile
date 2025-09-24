import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {getLocales} from 'react-native-localize';
import Config from 'react-native-config';

import optimaLocalesEn from './src/optima.customer/assets/locales/en.json';
import optimaLocalesEs from './src/optima.customer/assets/locales/es.json';

let es = null;
let en = null;

switch (Config.ENV) {
    case 'optima_customer':
        es = optimaLocalesEs;
        en = optimaLocalesEn;
        break;
    default:
        es = {};
        en = {};
        break;
}

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: getLocales()[0].languageCode,
    fallbackLng: 'en',
    resources: {
        en: {translation: en},
        es: {translation: es},
    },
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;