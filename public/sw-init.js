// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
if ("serviceWorker" in navigator) {
  await navigator.serviceWorker.register("/sw.js");
}
