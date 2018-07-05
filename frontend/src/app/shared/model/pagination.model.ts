export interface Paginator {
  currentPage: number;
  nextPage: number|boolean;
  lastPage: number;
  perPage: number;
  total: number;
}
