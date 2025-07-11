import { useState } from "react";
import Navbar from "../../Components/NavBar";

function AddProductAdmin() {
  const [nameProduct, setNameProduct] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("NameProduct", nameProduct);
    formData.append("Description", description);
    formData.append("Price", price);
    formData.append("Stock", stock);
    formData.append("Image", image); // <--- file input

    try {
      const response = await fetch("http://localhost:5296/api/Perkebunan", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Produk berhasil ditambahkan!");
        // Kosongkan form
        setNameProduct("");
        setDescription("");
        setPrice("");
        setStock("");
        setImage(null);
      } else {
        alert("Gagal menambahkan produk");
      }
    } catch (error) {
      console.error("Error saat upload:", error);
    }
  };

  return (
    <>
    <Navbar/ >
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Tambah Produk Perkebunan</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" value={nameProduct} onChange={(e) => setNameProduct(e.target.value)} placeholder="Nama Produk" className="border p-2 w-full rounded" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Deskripsi" className="border p-2 w-full rounded" />
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Harga" className="border p-2 w-full rounded" />
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stok" className="border p-2 w-full rounded" />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" className="w-full" />
          <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">Tambah</button>
        </form>
      </div>
    </>
  );
}

export default AddProductAdmin;
