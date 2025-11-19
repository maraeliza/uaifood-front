export type ResponseError = { message: string };

export interface ApiResponseError {
  message: string;
  status: number;
  type: string;
  errors?: {
    [key: string]: string;
  };
}
export interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: any, item: T) => React.ReactNode;
}
export interface PaginationProps {
  currentPage: number;
  lastPage: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}
export interface GenericTableProps<T> {
  data: T[];
  columns: readonly Column<T>[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  pagination?: PaginationProps;
}

export interface CategoryAdd {
  description: string;
}
export interface CategoryEdit extends CategoryAdd {
  id: number;
}
export interface Category extends CategoryEdit{
  createdAt: string;
  updatedAt: string;
}

export interface PaginationData {
  currentPage: number;
  registerPerPage: number;
  totalCountofRegisters: number;
  lastPage: number;
}

export interface GetCategoryResponse {
  categories: Category[];
  pageData: PaginationData;
}
