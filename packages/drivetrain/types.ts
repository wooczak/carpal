export interface User {
  id?: string;
  name: string;
  surname: string;
  password: string;
  email: string;
  keep_me_signed_in?: boolean;
}

export interface Journey {
  user_id: string;
  from_destination: string;
  to_destination: string;
  dates: Array<number>;
}
