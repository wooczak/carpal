export interface User {
  id?: string;
  name: string;
  surname: string;
  password: string;
  email: string;
  keep_me_signed_in?: boolean;
}
