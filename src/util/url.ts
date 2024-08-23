export const openNewTab = (url: string) => {
  if ("undefined" !== typeof window) {
    window.open(url, "_blank")?.focus();
  }
};
