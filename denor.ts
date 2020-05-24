import * as watcher from "./src/watcher.ts";
import * as runner from "./src/runner.ts";

function onError() {
  console.log("Error detected. Waiting for changes...");
}

async function main() {
  // initial process
  let process = runner.runAndWatchErrors(Deno.args, onError);

  await watcher.watchChanges(".", async () => {
    console.log("Reloading...");

    // assign the new process
    process = runner.runAndWatchErrors(Deno.args, onError, process);
  });
}
main();
