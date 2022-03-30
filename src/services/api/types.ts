export type LoginRequestDto = {
  email: string;
  password: string;
};

export type CustomerCreateDto = {
  email: string;
  password: string;
  lastname: string;
  firstname: string;
  phone: string;
};

export type TokenReadDto = {
  accessToken: string;
  refreshToken: string;
};

export type MessageDto = {
  message: string;
};

export type ErrorDto = {
  title: string;
  status: number;
  errors: Record<string, string[]>;
};

export interface ApiError extends Error {
  title: string;
  status: number;
  errors: Record<string | "reasons", string[]>;
}
