export interface IPaginationOptions {
  page: number;
  limit: number;
}

export interface IPaginationProps<TFilter> {
  pages: IPaginationOptions;
  filter?: TFilter;
}

export interface IPaginatedResponse<TData> {
  total: number;
  items: TData[];
}
