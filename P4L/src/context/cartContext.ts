import {createContext} from "react";

interface CartContextValue {
  state: number;
  onChange?: () => void;
}

export const CartContext = createContext<CartContextValue>({ state: 0 });
