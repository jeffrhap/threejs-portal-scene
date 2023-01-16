// Import - I18n Core //
import { createI18n } from 'vue-i18n'
import type { IEnv } from '@/interfaces/_ICore'

import messages from '@intlify/unplugin-vue-i18n/messages'

const { VITE_MULTILINGUAL_DEFAULT_LOCALE }: IEnv = import.meta.env

// Set default locale file and options //
// Options: https://vue-i18n.intlify.dev/api/general.html#createi18n //
const i18n: any = createI18n({
  legacy: true,
  locale: VITE_MULTILINGUAL_DEFAULT_LOCALE,
  warnHtmlInMessage: 'off',
  messages
})

export default i18n
