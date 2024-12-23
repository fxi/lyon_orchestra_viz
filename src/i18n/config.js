import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      theme: {
        light: 'Light',
        dark: 'Dark',
        system: 'System',
      },
      heatmap: {
        impressions: 'Impressions',
        balance: 'Balance',
        hall: 'Hall',
        stage: 'Stage',
        score: 'Score',
        empty: 'No data',
        position: 'Position',
        instrument: 'Instrument',
        configuration: 'Configuration',
        selectConfiguration: 'Select Configuration',
        allConfigurations: 'All Configurations',
      },
      language: {
        en: 'English',
        fr: 'French',
      },
      loading: 'Loading...',
      error: 'Error loading data',
      noData: 'No data available',
    },
  },
  fr: {
    translation: {
      theme: {
        light: 'Clair',
        dark: 'Sombre',
        system: 'Système',
      },
      heatmap: {
        impressions: 'Impressions',
        balance: 'Balance',
        hall: 'Salle',
        stage: 'Scène',
        score: 'Score',
        empty: 'Pas de données',
        position: 'Position',
        instrument: 'Instrument',
        configuration: 'Configuration',
        selectConfiguration: 'Sélectionner une configuration',
        allConfigurations: 'Toutes les configurations',
      },
      language: {
        en: 'Anglais',
        fr: 'Français',
      },
      loading: 'Chargement...',
      error: 'Erreur de chargement des données',
      noData: 'Aucune donnée disponible',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
