import { LoginRequestDto } from "../../models/Authentication";
import { CustomerCreateDto } from "../../models/Customer";
import {
  apiUrl,
  assertSuccess,
  getAnonymousHeaders, getAuthorizedHeaders,
  restMethods,
} from "./common";
import {User} from "../../models/Common";

export async function loginApi(login: LoginRequestDto): Promise<void> {
  const response = await fetch(`${apiUrl}/authentication/login`, {
    method: restMethods.post,
    headers: getAnonymousHeaders(),
    body: JSON.stringify(login),
  });

  await assertSuccess(response);

  const TokenReadDto = await response.json();
  localStorage.setItem("accessToken", TokenReadDto.accessToken);
  localStorage.setItem("refreshToken", TokenReadDto.refreshToken);
}

export async function RegisterApi(login: CustomerCreateDto): Promise<void> {
  const response = await fetch(`${apiUrl}/customers`, {
    method: restMethods.post,
    headers: getAnonymousHeaders(),
    body: JSON.stringify(login),
  });

  await assertSuccess(response);
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
  localStorage.setItem("accessToken", tokenReadDto.accessToken);
  localStorage.setItem("refreshToken", tokenReadDto.refreshToken);
}

export async function getProfile(): Promise<User> {
  const response = await fetch(`${apiUrl}/authentication/current-user`, {
    method: restMethods.get,
    headers: await getAuthorizedHeaders(),
  });

  return await response.json() as User;
}
