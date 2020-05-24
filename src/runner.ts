export function denoRun(cmd: string[]) {
  return Deno.run({
    cmd: ["deno", ...cmd],
  });
}
