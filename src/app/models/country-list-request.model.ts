export interface CountryListRequest {
  pageIndex: number;
  pageSize: number;
  sortOrder: string;
  sortColumn: string;
  searchQuery: string;
}
