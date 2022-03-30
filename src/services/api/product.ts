
import { apiUrl, restMethods, getAnonymousHeaders } from "./common";
import {ProductReadDto} from "../../models/Product";

export async function getProducts(restaurantId:string): Promise<ProductReadDto[]> {
    const response = await fetch(`${apiUrl}/restaurants/${restaurantId}/products`, {
        method: restMethods.get,
        headers: getAnonymousHeaders(),
    });
    return response.json();
}