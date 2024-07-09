/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string,
    readonly VITE_SITE_KEY: string,
    readonly VITE_SECRET_KEY: string,
    readonly VITE_CLIENT_ID: string,
    readonly VITE_CLIENT_SECRET: string
    // more env variables...
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}