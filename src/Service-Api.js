const API_BASE_URL = "http://localhost:5296/"

export async function fetchPerkebunan() {
  const response = await fetch(`${API_BASE_URL}/api/perkebunan`);
  if(!response.ok){
    throw new Error("gagal mengambil data produk");
  }
  return response.json();
}