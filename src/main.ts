import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '@/router/_Default'
import routerI18n from '@/router/_Locales' // Docs: https://lokalise.com/blog/vue-i18n //

// Import - Interfaces //
import type { IEnv } from '@/interfaces/_ICore'

// Import - Vue Plugins //
import axios from 'axios' // Docs: https://axios-http.com/docs/intro //
import VueAxios from 'vue-axios' // Docs: https://www.npmjs.com/package/vue-axios //
import { createGtm } from '@gtm-support/vue-gtm' // Docs: https://www.npmjs.com/package/vue-gtm //
import i18n from '@/modules/_Locales' // Docs: https://vue-i18n.intlify.dev //

// Import - Vue Global Components //

// Environment - Variables //
const {
  VITE_GTM_ID,
  VITE_IS_MULTILINGUAL,
  VITE_HAS_MULTILINGUAL_URL,
  VITE_APP_ENV
}: IEnv = import.meta.env;

const app = createApp(App)

app.use(createPinia())

// Vue - Multilangual //
if(VITE_IS_MULTILINGUAL === 'true'){
  app.use(i18n);
}

// Vue - Multilangual urls //
if(VITE_HAS_MULTILINGUAL_URL === 'true') {
  app.use(routerI18n);
}else {
  app.use(router);
}

// Vue - Google Tag Manager //
if(VITE_GTM_ID) {
  app.use(createGtm({
    id: VITE_GTM_ID,
    debug: VITE_APP_ENV === 'development'
  }))
}

// Vue - Plugins //
app.use(VueAxios, axios);

// Vue - Global Components //

// Vue - Set root component //
app.mount('#app')
