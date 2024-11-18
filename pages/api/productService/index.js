// pages/api/productService/index.js
export async function uploadProduct(productData) {
  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: productData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server responded with an error: ${errorText}`);
    }

    const result = await response.json();
    return result; // Return result on successful creation
  } catch (error) {
    console.error("Error creating product:", error.message);
    throw error; // Re-throw the error to be handled by the caller
  }
}
