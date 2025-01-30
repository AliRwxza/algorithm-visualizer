import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
	server: {
		port: 3000, // Choose a different port number
	},
	plugins: [svgr(), react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		outDir: "build",
		rollupOptions: {
			onwarn(warning, warn) {
				// Log all warnings
				console.warn(warning.message);
			},
		},
	},
});
