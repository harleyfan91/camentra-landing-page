/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WAITLIST_FORM_ACTION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
