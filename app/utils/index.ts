export function generateSimpleId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 11)}`; // same 9-char slice
}
