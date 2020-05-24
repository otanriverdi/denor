export async function watchChanges(
  paths: string,
  onChange: Function,
  config = { interval: 500 }
) {
  const watcher = Deno.watchFs(paths);
  let detected = false;

  for await (const event of watcher) {
    if (event.kind === "modify" && !detected) {
      detected = true;

      onChange();

      setTimeout(() => (detected = false), config.interval);
    }
  }
}
