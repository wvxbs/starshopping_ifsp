import i18n from 'i18n-js'
import en from './en-US'
import pt from './pt-BR'
import * as Localization from 'expo-localization';

const setLanguageToI18n = () => {
  i18n.fallbacks = true
  i18n.translations = { en, pt }
  i18n.locale = Localization.locale

}

setLanguageToI18n()

export const translate = key => i18n.t(key)