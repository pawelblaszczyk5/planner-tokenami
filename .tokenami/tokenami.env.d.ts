/* eslint-disable @typescript-eslint/no-empty-interface, @typescript-eslint/consistent-type-definitions, @typescript-eslint/consistent-indexed-object-style, @typescript-eslint/no-restricted-imports */
import type { TokenamiProperties } from "@tokenami/dev";

import type config from "./tokenami.config";

export type Config = typeof config;

declare module "@tokenami/dev" {
	interface TokenamiConfig extends Config {}
}

declare module "react" {
	interface CSSProperties extends TokenamiProperties {
		[customProperty: `---${string}`]: number | string | undefined;
	}
}
