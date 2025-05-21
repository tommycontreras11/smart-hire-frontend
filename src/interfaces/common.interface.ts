import { Path, PathValue } from "react-hook-form";

export interface IForm<T> {
  property: Path<T>;
  value: PathValue<T, Path<T>>;
}

export interface IPersonBase {
  uuid: string;
  identification: string;
  email: string;
  name: string;
  password: string;
}