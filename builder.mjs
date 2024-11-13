import * as esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import postcss from "postcss";
import autoprefixer from "autoprefixer";

const context = await esbuild.context({
  entryPoints: ["index.ts"],
  bundle: true,
  minify: true,
  sourcemap: true,
  outdir: "dist",
  plugins: [],
});

// Enable watch mode
await context.watch();

// // Enable serve mode
// await context.serve();
//
// // Dispose of the context
// await context.dispose();
