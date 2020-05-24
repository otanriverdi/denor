export async function watchChanges(
  paths: string,
  onChange: Function,
  config = { interval: 500 }
) {
  const watcher = Deno.watchFs(paths);
  let reloading = false;

  for await (const event of watcher) {
    if (event.kind === "modify" && !reloading) {
      console.log(`Detected change on ${event.paths[0]}`);

      reloading = true;

      // we want this to always run sync to not block the watcher
      onChange();

      setTimeout(() => (reloading = false), config.interval);
    }
  }
}
