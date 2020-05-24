export function denoRun(cmd: string[], currentProcess?: Deno.Process) {
  // if there is an existing process we close it
  // before running the second
  if (currentProcess) {
    currentProcess.close();
  }

  return Deno.run({
    cmd: ["deno", ...cmd],
  });
}

export async function watchProcessError(
  process: Deno.Process,
  onError: Function
) {
  try {
    if ((await process.status()).success === false) {
      onError();
    }
  } catch (error) {
    // status() throws an error when the process is closed
    // hence we need it to return since this is normal behavior
    return;
  }
}

export function runAndWatchErrors(
  cmd: string[],
  onError: Function,
  ongoingProcess?: Deno.Process
) {
  const process = denoRun(Deno.args, ongoingProcess);

  // we want this to run sync to not block the watcher
  watchProcessError(process, onError);

  return process;
}
