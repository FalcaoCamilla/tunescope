import { AccessDataResponse } from "./access-data-response";

export type UserData = {
  username: string;
  password: string;
} & AccessDataResponse;