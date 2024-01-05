import type { TokenamiProperties } from "@tokenami/dev";

import { createCss } from "@tokenami/css";

import tokenamiConfig from ".tokenami/tokenami.config";

export const css = createCss(tokenamiConfig);

const emptyCss = css({});

export const mergeCss = (...styles: Array<TokenamiProperties | false | undefined>) => emptyCss(null, ...styles);

export { type Variants } from "@tokenami/css";
