import esbuild from "esbuild";
import sveltePlugin from "esbuild-svelte";

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    mainFields: ["svelte", "browser", "module", "main"],
    external:["lazip"],
    bundle: true,
    watch: true,
    outfile: "dist/index.js",
    plugins: [sveltePlugin()],
    logLevel: "info",
  })
  .catch(() => process.exit(1));