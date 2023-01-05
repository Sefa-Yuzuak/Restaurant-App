import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    ); //bunu sepet içindeki ürünlerin özellikleri hazırlarken güncelliyoruz aynı ürünleri bir arada tutmak için
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      //bunu sepet içindeki ürünlerin özellikleri hazırlarken güncelliyoruz aynı ürünleri bir arada tutmak için
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item); //bunu sepet içindeki ürünlerin özellikleri hazırlarken güncelliyoruz aynı ürünleri bir arada tutmak için
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {  //bunu sepet içindeki ürünlerin amountunu artı eksi butonlarıyla ayarlamak için yapıyoruz
    
    const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if(existingItem.amount === 1) { //ürünün amountu 1 ise direk ürünü updateItems tan sileriz amountunu bir azaltmak yerine
            updatedItems = state.items.filter(item => item.id !== action.id)
        } else { //ürünün amountu 1 den büyük ise updateItem da bir azaltırız.
            const updatedItem = {...existingItem, amount: existingItem.amount-1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return{
            items: updatedItems, 
            totalAmount: updatedTotalAmount
        }
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
