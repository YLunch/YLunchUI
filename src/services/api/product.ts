import {
  apiUrl,
  getAnonymousHeaders,
  restMethods,
} from "../../common/services/api/helpers";
import { ProductReadDto } from "../../models/Product";

export async function getProducts(
  restaurantId: string
): Promise<ProductReadDto[]> {
  const response = await fetch(
    `${apiUrl}/restaurants/${restaurantId}/products`,
    {
      method: restMethods.get,
      headers: getAnonymousHeaders(),
    }
  );
  return response.json();
}

export async function getProductsByIds(
  productIds: string[],
  restaurantId: string
): Promise<ProductReadDto[]> {
  const params = productIds.reduce((params, id, index) => {
    params += `productIds=${id}`;
    if (index < productIds.length - 1) params += "&";
    return params;
  }, "?");

  const response = await fetch(
    // `${apiUrl}/restaurants/${restaurantId}/products${params}`,
    `https://virtserver.swaggerhub.com/rael06/ylunch-api/1.0.0/restaurants/${restaurantId}/products${params}`,
    {
      method: restMethods.get,
      headers: getAnonymousHeaders(),
    }
  );
  return response.json();
}
