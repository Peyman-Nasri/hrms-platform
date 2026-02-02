export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

export function normalizePage(page?: number): number {
  if (!Number.isFinite(page as number)) return 1;
  const p = Math.floor(page as number);
  return p > 0 ? p : 1;
}

export function normalizePageSize(pageSize?: number): number {
  if (!Number.isFinite(pageSize as number)) return DEFAULT_PAGE_SIZE;
  const s = Math.floor(pageSize as number);
  const clamped = s > 0 ? s : DEFAULT_PAGE_SIZE;
  return Math.min(clamped, MAX_PAGE_SIZE);
}

export function getPaginationBounds(
  page: number,
  pageSize: number,
  total: number,
) {
  if (total === 0) {
    return { start: 0, end: 0 };
  }

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(total, page * pageSize);

  return { start, end };
}

export function getPrevNext(page: number, totalPages: number) {
  const prevPage = page > 1 ? page - 1 : 1;
  const nextPage = page < totalPages ? page + 1 : totalPages;

  return { prevPage, nextPage };
}
