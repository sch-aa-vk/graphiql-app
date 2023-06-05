import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './translation/translation.en.json';
import translationRU from './translation/translation.ru.json';

const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: 'en', // default language
});

export default i18next;
