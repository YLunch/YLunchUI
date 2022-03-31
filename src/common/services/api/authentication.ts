import { LoginRequestDto, UserReadDto } from "../../models/Authentication";
import { removeLocalStorageItem, setLocalStorageItem } from "../localStorage";

import {
  apiUrl,
  assertSuccess,
  getAnonymousHeaders,
  getAuthorizedHeaders,
  restMethods,
} from "./common";

export async function loginApi(login: LoginRequestDto): Promise<void> {
  const response = await fetch(`${apiUrl}/authentication/login`, {
    method: restMethods.post,
    headers: getAnonymousHeaders(),
    body: JSON.stringify(login),
  });
  if (response.status >= 400) {
    removeLocalStorageItem("accessToken");
    removeLocalStorageItem("refreshToken");
  }

  await assertSuccess(response);

  const TokenReadDto = await response.json();
  setLocalStorageItem("accessToken", TokenReadDto.accessToken);
  setLocalStorageItem("refreshToken", TokenReadDto.refreshToken);
}

export async function getNewTokens(): Promise<void> {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const response = await fetch(`${apiUrl}/authentication/refresh-tokens`, {
    method: restMethods.post,
    headers: getAnonymousHeaders(),
    body: JSON.stringify({ accessToken, refreshToken }),
  });

  await assertSuccess(response);

  const tokenReadDto = await response.json();
  setLocalStorageItem("accessToken", tokenReadDto.accessToken);
  setLocalStorageItem("refreshToken", tokenReadDto.refreshToken);
}

export async function getCurrentUserApi(): Promise<UserReadDto> {
  const response = await fetch(`${apiUrl}/authentication/current-user`, {
    method: restMethods.get,
    headers: await getAuthorizedHeaders(),
  });

  assertSuccess(response);

  return (await response.json()) as UserReadDto;
}
