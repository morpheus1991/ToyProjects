import { SyntheticEvent } from "react";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { ADD_CART, CartType, UPDATE_CART } from "../../../graphql/cart";
import { graphqlFetcher } from "../../../queryClient";

const CartItem = ({ id, imageUrl, price, title, amount }: CartType) => {
  const { mutate: updateCart } = useMutation(
    ({ id, amount }: { id: string; amount: number }) =>
      graphqlFetcher(UPDATE_CART, { id, amount })
  );

  const queryClient = useQueryClient();
  const handleUpdateAmount = (e: SyntheticEvent) => {
    const amount = Number((e.target as HTMLInputElement).value);
    updateCart({ id, amount });
    queryClient.invalidateQueries("");
  };
  return (
    <li className="cart-item">
      <img src={imageUrl} />
      <p className="cart-item__price">{price}</p>
      <p className="cart-item__title">{title}</p>
      <input
        type="number"
        className="cart-item__amount"
        value={amount}
        onChange={handleUpdateAmount}
      />
    </li>
  );
};

export default CartItem;
