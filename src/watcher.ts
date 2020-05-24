export async function watchChanges(
  paths: string,
  onChange: Function,
  config = { interval: 500 }
) {
  const watcher = Deno.watchFs(paths);
  let reloading = false;

  for await (const event of watcher) {
    if (event.kind === "modify" && !reloading) {
      reloading = true;

      onChange();

      setTimeout(() => (reloading = false), config.interval);
    }
  }
}
