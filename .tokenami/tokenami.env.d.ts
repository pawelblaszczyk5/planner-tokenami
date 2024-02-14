/* eslint-disable @typescript-eslint/no-empty-interface, @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-restricted-imports */
import type config from "./tokenami.config";

export type Config = typeof config;

declare module "@tokenami/dev" {
	interface TokenamiConfig extends Config {}
}
