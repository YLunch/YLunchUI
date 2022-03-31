import { RestaurantReadDto } from "../../../common/models/Restaurant";
import {
  apiUrl,
  restMethods,
  getAnonymousHeaders,
} from "../../../common/services/api/common";

export async function getRestaurants(): Promise<RestaurantReadDto[]> {
  const response = await fetch(`${apiUrl}/restaurants`, {
    method: restMethods.get,
    headers: getAnonymousHeaders(),
  });
  return response.json();
}
