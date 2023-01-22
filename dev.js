import esbuild from "esbuild";
import sveltePlugin from "esbuild-svelte";

let ctx=await esbuild
.context({
    entryPoints: ["src/index.ts"],
    mainFields: ["svelte", "browser", "module", "main"],
    external:[],
    bundle: true,
    //watch: true,
    outfile: "dist/index.js",
    plugins: [sveltePlugin()],
    logLevel: "info",
  })
  .catch(() => process.exit(1));
    
await ctx.watch();