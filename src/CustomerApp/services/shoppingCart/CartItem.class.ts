import { Buyable } from "./buyable.interface";

export class CartItem implements Buyable {
  constructor(public id: string, public name: string, public price: number, public qty: number) {}
}
