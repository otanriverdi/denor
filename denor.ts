import * as watcher from "./src/watcher.ts";
import * as runner from "./src/runner.ts";

async function main() {
  console.log("Starting the process...");

  // initial process
  let process = runner.denoRun(Deno.args);

  await watcher.watchChanges(".", async () => {
    console.log("File change detected. Reloading...");

    // close the ongoing process
    process.close();
    // assign the new process
    process = runner.denoRun(Deno.args);

    console.log(process.rid);

    try {
      const status = await process.status();

      // watch for errors
      if ((await process.status()).success === false) {
        console.log("Error detected. Waiting for changes...");
      }
    } catch (error) {
      // status() throws an error when closed
      return;
    }
  });
}
main();
