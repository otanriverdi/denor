import * as watcher from "./src/watcher.ts";
import * as runner from "./src/runner.ts";

async function main() {
  await watcher.watchChanges(".", () => {
    console.log("File change detected. Reloading...");

    runner.denoRun(Deno.args);
  });
}
main();
