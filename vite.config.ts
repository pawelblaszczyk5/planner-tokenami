import optimizeLocales from "@react-aria/optimize-locales-plugin";
import react from "@vitejs/plugin-react-swc";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths(),
		{
			...optimizeLocales.vite({
				locales: ["en-US"],
			}),
			enforce: "pre",
		},
		Icons({
			autoInstall: true,
			compiler: "jsx",
			iconCustomizer: (_collection, _icon, props) => {
				props["aria-hidden"] = "true";
				props["focusable"] = "false";
			},
			jsx: "react",
		}),
	],
});
