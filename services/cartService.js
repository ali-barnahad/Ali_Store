// services/cartService.js
import axios from "axios";

export const updateCartItemQuantity = async (productId, quantity) => {
  try {
    const responseToken = await fetch("/api/get-refresh-token");
    const data = await responseToken.json();
    const token = data.refreshToken;
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await axios.put(
      "/api/cart/updateQuantity",
      {
        productId,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // Assuming a successful response structure
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    throw error; // Re-throw the error to be handled or displayed by the calling component
  }
};

export const deleteCartItem = async (productId) => {
  try {
    const responseToken = await fetch("/api/get-refresh-token");
    const data = await responseToken.json();
    const token = data.refreshToken;
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await axios.delete(`/api/cart/deleteItem/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Assuming your API returns a success status or message on deletion
  } catch (error) {
    console.error("Error deleting cart item:", error);
    throw error; // Allows the error to be handled or displayed by the calling component
  }
};
