export async function watchChanges(paths: string, onChange: Function) {
  const watcher = Deno.watchFs(paths);
  let detected = false;

  for await (const event of watcher) {
    if (event.kind === 'modify' && !detected) {
      detected = true;
      
      onChange();
      
      // this is to prevent reload called two times because watchFs return multiple events
      setTimeout(() => detected = false, 100);
    }
  }
}
