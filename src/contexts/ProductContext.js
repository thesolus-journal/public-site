import { createContext, useState, useContext, useEffect } from "react";

/**
 * @typedef {object} Product
 * @property {number|string} id - The unique identifier for the product.
 * @property {string} name - The name of the product.
 * @property {number} price - The price of the product.
 * @property {string} image - The URL of the product image.
 */

/**
 * @typedef {object} CartItem
 * @property {number|string} id - The unique identifier for the product.
 * @property {string} name - The name of the product.
 * @property {number} price - The price of the product.
 * @property {string} image - The URL of the product image.
 * @property {number} quantity - The quantity of the product in the cart.
 * @property {number} totalPrice - The total price for the item (price * quantity).
 */

/**
 * @callback AddToCart
 * @param {Product} product - The product to add to the cart.
 * @param {number} [quantity=1] - The quantity to add.
 * @returns {void}
 */

/**
 * @callback RemoveFromCart
 * @param {number|string} productId - The ID of the product to remove.
 * @returns {void}
 */

/**
 * @callback UpdateQuantity
 * @param {number|string} productId - The ID of the product to update.
 * @param {number} quantity - The new quantity.
 * @returns {void}
 */

/**
 * @callback ClearCart
 * @returns {void}
 */

/**
 * @typedef {object} ProductContextValue
 * @property {CartItem[]} cart - The array of products in the cart.
 * @property {AddToCart} addToCart - Adds a product to the cart or updates its quantity.
 * @property {RemoveFromCart} removeFromCart - Removes a product from the cart by its ID.
 * @property {UpdateQuantity} updateQuantity - Updates the quantity of a product in the cart.
 * @property {ClearCart} clearCart - Clears all items from the cart.
 * @property {number} totalCartItems - The total number of items in the cart.
 */

/**
 * ProductContext provides the cart state and related functions to its children.
 * @type {React.Context<ProductContextValue>}
 */
const ProductContext = createContext();

/**
 * A custom hook to access the product context.
 * @returns {ProductContextValue} The product context value.
 */
export const useProductContext = () => useContext(ProductContext);

/**
 * Provides the product context to its children components.
 * It manages the shopping cart state and actions.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {JSX.Element} The provider component.
 */
export const ProductProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /** @type {AddToCart} */
  const addToCart = (product, quantity = 1) => {
    const productPrice = Number(product.price);
    if (isNaN(productPrice)) {
      console.error("Product price is not a valid number:", product.price);
      return;
    }

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id,
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        const existingItem = updatedCart[existingItemIndex];
        const newQuantity = existingItem.quantity + quantity;

        updatedCart[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity,
          totalPrice: newQuantity * existingItem.price,
        };
        return updatedCart;
      } else {
        return [
          ...prevCart,
          {
            ...product,
            price: productPrice,
            quantity,
            totalPrice: quantity * productPrice,
          },
        ];
      }
    });
  };

  /** @type {RemoveFromCart} */
  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((product) => product.id !== productId),
    );
  };

  /** @type {UpdateQuantity} */
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId
          ? {
              ...product,
              quantity,
              totalPrice: quantity * product.price,
            }
          : product,
      ),
    );
  };

  /** @type {ClearCart} */
  const clearCart = () => {
    setCart([]);
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  /** @type {ProductContextValue} */
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalCartItems,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
