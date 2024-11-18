// services/cartService.js
import axios from "axios";

export const deleteWishItem = async (productId) => {
  try {
    const responseToken = await fetch("/api/get-refresh-token");
    const data = await responseToken.json();
    const token = data.refreshToken;
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await axios.delete(
      `/api/wishList/deleteItem/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // Assuming your API returns a success status or message on deletion
  } catch (error) {
    console.error("Error deleting cart item:", error);
    throw error; // Allows the error to be handled or displayed by the calling component
  }
};
