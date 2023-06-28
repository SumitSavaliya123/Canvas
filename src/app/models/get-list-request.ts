export interface GetListRequest {
  pageIndex: number;
  pageSize: number;
  sortOrder: string;
  sortColumn: string;
  searchQuery: string;
}
