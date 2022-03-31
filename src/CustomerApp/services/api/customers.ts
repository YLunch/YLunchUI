import { CustomerCreateDto } from "../../models/Customer";
import {
  apiUrl,
  restMethods,
  getAnonymousHeaders,
  assertSuccess,
} from "../../../common/services/api/common";

export async function addCustomerApi(login: CustomerCreateDto): Promise<void> {
  const response = await fetch(`${apiUrl}/customers`, {
    method: restMethods.post,
    headers: getAnonymousHeaders(),
    body: JSON.stringify(login),
  });

  await assertSuccess(response);
}
