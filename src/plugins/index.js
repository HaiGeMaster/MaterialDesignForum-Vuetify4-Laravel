/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

//请勿修改顺序，容易导致层叠样式顺序混乱
// Plugins
import vuetify from './vuetify'
import router from '@/router'
import i18n from './i18n' 
import pinia from './pinia'


// 2

//请勿修改顺序，容易导致层叠样式顺序混乱
// Plugins
// import router from '@/router'
// import i18n from './i18n' 
// import pinia from './pinia'
// import vuetify from './vuetify'

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(i18n)
    .use(pinia)
    // .use(vuetify)
}
