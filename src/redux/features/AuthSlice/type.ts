import { EStatus } from "../ProductsSlice/types";

import { ADMINS } from "../../../utiles/consts";

export type TRegister = {
  email: string;
  password: string;
  displayName: string | null;
  phoneNumber: number | null;
  photoURL: string | null;
};

export type TLogin = {
  email: string;
  password: string;
};

export type TUser = {
  email: string;
  displayName: string;
  phoneNumber: number;
  photoURL: string;
};

export interface IInitialState {
  user: null | TUser;
  status: EStatus;
  error: any;
}

// const { user } = useSelector((state: RootState) => state.auth);
// const ISADMIN = IsAdmin(user);
