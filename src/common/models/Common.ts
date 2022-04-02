export type MessageDto = {
  message: string;
};

export type ErrorDto = {
  title: string;
  status: number;
  errors: Record<string, string[]>;
};

export interface ApiError<TRequestDto> extends Error {
  title: string;
  status: number;
  errors:
    | Record<keyof TRequestDto, string[] | undefined>
    | Record<"reasons", string[]>;
}

export interface ApiValidationError<TRequestDto> extends ApiError<TRequestDto> {
  title: string;
  status: number;
  errors: Record<keyof TRequestDto, string[] | undefined>;
}

export interface ApiStandardError extends ApiError<void> {
  title: string;
  status: number;
  errors: Record<"reasons", string[]>;
}

export function isApiValidationError<TRequestDto>(
  error: ApiError<TRequestDto>
): error is ApiValidationError<TRequestDto> {
  return (
    error.title === "One or more validation errors occurred." &&
    error.status === 400
  );
}

export function isApiStandardError(error: any): error is ApiStandardError {
  return error.title !== "One or more validation errors occurred.";
}
