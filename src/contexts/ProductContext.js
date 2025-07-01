import { createContext, useState, useContext, useEffect } from "react";

/**
 * @typedef {object} Product
 * @property {number} id - The unique identifier for the product.
 * @property {string} name - The name of the product.
 * @property {number} price - The price of the product.
 * @property {string} image - The URL of the product image.
 */

/**
 * @typedef {object} CartItem
 * @property {number} id - The unique identifier for the product.
 * @property {string} name - The name of the product.
 * @property {number} price - The price of the product.
 * @property {string} image - The URL of the product image.
 * @property {number} quantity - The quantity of the product in the cart.
 * @property {number} totalPrice - The total price of the product in the cart (price * quantity).
 */

/**
 * @typedef {object} ProductContextValue
 * @property {CartItem[]} cart - The array of products in the cart.
 * @property {function(Product): void} addToCart - Adds a product to the cart.
 * @property {function(number): void} removeFromCart - Removes a product from the cart by its ID.
 * @property {function(number, number): void} updateQuantity - Updates the quantity of a product in the cart.
 * @property {function(number): boolean} inCart - Checks if a product is in the cart.
 */

/**
 * ProductContext provides the cart state and related functions to its children.
 * @type {React.Context<ProductContextValue>}
 */
const ProductContext = createContext();

/**
 * useProductContext is a custom hook that provides access to the ProductContext value.
 * @returns {ProductContextValue}
 */
export const useProductContext = () => useContext(ProductContext);

/**
 * ProductProvider is a component that provides the ProductContext to its children.
 * It manages the cart state and provides functions to interact with the cart.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns {JSX.Element}
 */
export const ProductProvider = ({ children }) => {
  /**
   * @type {[CartItem[], function(CartItem[]): void]}
   */
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /**
   * Adds a product to the cart.
   * If the product is already in the cart, it does not add it again.
   * @param {Product} product - The product to add to the cart.
   */
  const addToCart = (product) => {
    setCart((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);
      if (existingProduct) return prev; // Product already in cart, no need to add
      return [...prev, { ...product, quantity: 1, totalPrice: product.price }];
    });
  };

  /**
   * Removes a product from the cart by its ID.
   * @param {number} productId - The ID of the product to remove.
   */
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((product) => product.id !== productId));
  };

  /**
   * Updates the quantity of a product in the cart.
   * @param {number} productId - The ID of the product to update.
   * @param {number} quantity - The new quantity of the product.
   */
  const updateQuantity = (productId, quantity) => {
    setCart((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, quantity, totalPrice: quantity * product.price }
          : product,
      ),
    );
  };

  /**
   * Checks if a product is in the cart.
   * @param {number} productId - The ID of the product to check.
   * @returns {boolean}
   */
  const inCart = (productId) => {
    return cart.some((product) => product.id === productId);
  };

  const clearCart = () => {
    setCart([]);
  };

  /**
   * @type {ProductContextValue}
   */
  const value = {
    cart,
    addToCart,
    removeFromCart,
    inCart,
    updateQuantity,
    clearCart,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
