import { defineConfig } from "vite";
import chokidar from "chokidar";
import cp from "node:child_process";
import fs from "node:fs";

/**
 * @type {import('vite').Plugin}
 */
const plugin = {
  buildStart() {
    function build() {
      fs.rmSync("trees/publish", { recursive: true, force: true });
      fs.rmSync("trees/trees", { recursive: true, force: true });
      cp.execSync("kodama c -r trees");
      cp.execSync("node scripts/highlight.js");
    }

    build();

    chokidar
      .watch(["trees"], { ignored: /^trees\/(trees|publish)/ })
      .on("all", (_, path) => {
        build();
      });
  },
};

export default defineConfig({
  root: "./trees/publish",
  plugins: [plugin],
});
