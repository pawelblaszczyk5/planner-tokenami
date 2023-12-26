/* eslint-disable @typescript-eslint/consistent-type-definitions -- augmenting modules */
/* eslint-disable spaced-comment -- typescript reference broken by additional spaces */
/// <reference types="vite/client" />
/// <reference types="react/canary" />

interface ImportMetaEnv {
	readonly VITE_REPLICACHE_LICENSE_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
