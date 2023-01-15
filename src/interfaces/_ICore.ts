export interface IEnv {
  VITE_APP_ENV: string,
  VITE_GTM_ID?: string,
  VITE_IS_MULTILINGUAL?: string,
  VITE_HAS_MULTILINGUAL_URL?: string,
  VITE_MULTILINGUAL_DEFAULT_LOCALE?: string,
  VITE_MULTILINGUAL_SUPPORTED_LOCALE?: string
}

export interface IMetadataObject {
  [key: string]: any
}