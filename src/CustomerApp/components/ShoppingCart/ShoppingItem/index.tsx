import { CartItem } from '../../../services/shoppingCart/CartItem.class'

export default function ShoppingItem({item}: {item: CartItem}) {
  return (
    <div>{item.name}</div>
  )
}
