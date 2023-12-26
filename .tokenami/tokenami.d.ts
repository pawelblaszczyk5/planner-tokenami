/* eslint-disable @typescript-eslint/no-empty-interface, @typescript-eslint/consistent-type-definitions, @typescript-eslint/consistent-indexed-object-style, @typescript-eslint/no-restricted-imports */
import type { TokenamiStyles } from "@tokenami/dev";

import type config from "./tokenami.config";

type Config = typeof config;

declare module "@tokenami/dev" {
	interface TokenamiConfig extends Config {}
}

declare module "csstype" {
	interface Properties extends TokenamiStyles {
		[customProperty: `---${string}`]: number | string | undefined;
	}
}
