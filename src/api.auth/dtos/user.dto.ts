export interface IUserCreateDTO {
  email: string;
  password: string;
}

export interface IUserUpdateDTO {
  email: string;
  password: string;
}

export interface IUserLoggedDTO {
  id: number;
  email: string;
}
