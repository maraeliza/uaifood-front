import { ZodSchema } from "zod";

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

export interface PaginationData {
  currentPage: number;
  registerPerPage: number;
  totalCountofRegisters: number;
  lastPage: number;
}

export interface Field<T> {
  key: keyof T;
  label: string;
  placeholder?: string;
  type?: string;
}

export interface CreateModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: T) => void;
  schema: ZodSchema<T>;
  fields: Field<T>[];
  title?: string;
  isPending?: boolean;
}
export interface EditModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  initialData: T | null;
  fields: Field<T>[];
  title?: string;
  onSubmit: (updated: T) => void;
  isPending: boolean;
}
