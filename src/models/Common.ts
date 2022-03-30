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

export type User = {
  email: string;
  phoneNumber: string;
  firstname: string;
  lastname: string;
  roles: string[];
  id: string;
}
