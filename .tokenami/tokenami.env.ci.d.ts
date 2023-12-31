/* eslint-disable @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-restricted-imports */
import type { Config } from "./tokenami.env";

declare module "@tokenami/dev" {
	interface TokenamiConfig extends Config {
		CI: true;
	}
}
