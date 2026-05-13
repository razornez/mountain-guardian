export function logPerf({ route, step, durationMs, method }) {
  const safePayload = { route, step, durationMs, method };
  if (durationMs > 1000) {
    console.warn('[PERF][SLOW]', safePayload);
    return;
  }
  console.info('[PERF]', safePayload);
}
