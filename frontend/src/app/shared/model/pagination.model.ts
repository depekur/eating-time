export interface IPaginator {
  currentPage: number;
  nextPage: number|boolean;
  lastPage: number;
  perPage: number;
  total: number;
}
