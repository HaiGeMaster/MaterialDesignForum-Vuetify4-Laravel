import { createI18n } from 'vue-i18n'


import messages from '@/assets/language/language.js'
// const messages = () => import('@/assets/language/language.js')
// import messages from '@/assets/language/new_language.js'

// import messages from '../../MaterialDesignForum-Vuetify2/src/assets/language/language.js'
/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
function loadLocaleMessages() {
  const locales = require.context('./', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key).default
    }
  })
  return messages
}

function GetFirstLangCodeList() {
  for (let langCode in messages) {
    // if (messages[langCode].info.usability) {
    if (messages[langCode].Message.usability) {
      return langCode;
    }
  }
}

export default createI18n({
  legacy: true,
  // legacy: false, // you must set `false`, to use Composition API
  locale: GetFirstLangCodeList() || 'zh_CN',
  fallbackLocale: 'en_US',
  // locale: 'zh_CN',
  // fallbackLocale:'zh_CN',
  messages,
})
