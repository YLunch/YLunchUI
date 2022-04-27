import {
  apiUrl,
  getAnonymousHeaders,
  processResponse,
  restMethods,
} from "../../../common/services/api/helpers";
import {RestaurantCreateDto} from "../../models/Restaurant";

export async function createRestaurant(
  Data: RestaurantCreateDto
): Promise<RestaurantCreateDto> {
  return fetch(`${apiUrl}/restaurants`, {
    method: restMethods.post,
    headers: getAnonymousHeaders(),  //a remplacer
    body: JSON.stringify(Data),
  }).then(async (response) => await processResponse(response));
}
