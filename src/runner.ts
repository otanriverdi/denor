export function denoRun(cmd: string[]) {
  Deno.run({
    cmd: ["deno", "run", ...cmd],
  });
}
