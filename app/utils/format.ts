export function formatDate(value: Date | string | null | undefined) {
  return value ? new Date(value).toLocaleDateString() : "—";
}
