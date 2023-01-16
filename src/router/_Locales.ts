import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
import type { IEnv } from '@/interfaces/_ICore';
import i18n from '@/modules/_Locales'
import { PageName } from '@/utils/_Constants';

import LocaleView from '@/components/LocaleView.vue';
import Home from '../views/Home.vue'

const { VITE_MULTILINGUAL_SUPPORTED_LOCALE, VITE_MULTILINGUAL_DEFAULT_LOCALE }: IEnv = import.meta.env;

const paths = [
  {
    path: '',
    name: PageName.HOME,
    component: Home
  }
]

const routes = [{
  path: '/:locale',
  component: LocaleView,
  beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const locale = to.params.locale;
    const supported_locales = VITE_MULTILINGUAL_SUPPORTED_LOCALE?.split(',');

    // @ts-ignore
    if (!supported_locales.includes(locale) && VITE_MULTILINGUAL_DEFAULT_LOCALE) {
      return next(VITE_MULTILINGUAL_DEFAULT_LOCALE)
    }

    if (i18n.global.locale !== locale) {
      i18n.global.locale.value = locale
    }

    return next();
  },
  children: paths
},
{
  path: '/:catchAll(.*)',
  redirect() {
    return VITE_MULTILINGUAL_DEFAULT_LOCALE || 'en'
  }
}]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router;
