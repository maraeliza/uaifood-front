import { Address } from "./address";
import { PaginationData } from "./common";

export interface UserAdd {
  name: string;
  email: string;
  phone: string;
  address?: Address;
}

export interface UserEdit extends UserAdd {
  id: number;
}

export interface User extends UserEdit {
  createdAt: string;
  updatedAt: string;
}

export interface GetUserResponse {
  data: User[];
  meta: PaginationData;
}
