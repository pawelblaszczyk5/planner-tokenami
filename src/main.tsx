import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { invariant } from "#/utils/invariant";

const rootElement = document.querySelector("#root");

invariant(rootElement);

createRoot(rootElement).render(
	<StrictMode>
		<h1>Hello world</h1>
	</StrictMode>,
);
