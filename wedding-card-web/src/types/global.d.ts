declare type PropType<T> = VuePropType<T>;
declare type VueNode = VNodeChild | JSX.Element;

export type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};

declare type Nullable<T> = T | null;
declare type NonNullable<T> = T extends null | undefined ? never : T;
declare type Recordable<T = any> = Record<string, T>;
declare type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T;
};
declare type Indexable<T = any> = {
  [key: string]: T;
};
declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

interface ViteEnv {
  readonly VITE_GLOB_API_PROXY_PREFIX: string;
  readonly VITE_GLOB_API_URL: string;
  readonly VITE_GLOB_PROXY_API_URL: string;
  readonly VITE_PORT: number;
  readonly VITE_GLOB_APP_TITLE: string;
  readonly VITE_PUBLIC_PATH: string;
  readonly VITE_DROP_CONSOLE: boolean;
}

interface ImportMetaEnv extends ViteEnv {
  __: unknown;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
