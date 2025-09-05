"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Image from "next/image";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  description?: string;
  images: { url: string }[];
  category?: { _id: string; name: string };
}

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch product & categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          fetch(`${baseUrl}/products/${id}`),
          fetch(`${baseUrl}/categories`),
        ]);

        const productData = await productRes.json();
        const categoryData = await categoryRes.json();

        const prod = productData.product || productData;
        
        setProduct(prod);

        setCategories(
          Array.isArray(categoryData) ? categoryData : categoryData.categories || []
        );
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    if (id) fetchData();
  }, [id]);

  // ✅ Handle update
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product) return;

    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        toast.success("Product updated successfully!");
        router.push("/dashboard/products");
      } else {
        toast.error("Failed to update product");
      }
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error("Error updating product");
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return <p className="p-6 text-gray-600">Loading product...</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Name */}
        <div>
          <Label>Name</Label>
          <Input
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
          />
        </div>

        {/* Price */}
        <div>
          <Label>Price</Label>
          <Input
            type="number"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: Number(e.target.value) })
            }
            required
          />
        </div>

        {/* Unit */}
        <div>
          <Label>Unit</Label>
          <Input
            value={product.unit}
            onChange={(e) => setProduct({ ...product, unit: e.target.value })}
            required
          />
        </div>

        {/* Quantity */}
        <div>
          <Label>Quantity</Label>
          <Input
            type="number"
            value={product.quantity}
            onChange={(e) =>
              setProduct({ ...product, quantity: Number(e.target.value) })
            }
            required
          />
        </div>

        {/* Category */}
        <div>
          <Label>Category</Label>
          <select
            className="border rounded-md w-full p-2"
            value={product.category?._id || ""}
            onChange={(e) =>
              setProduct({
                ...product,
                category: { _id: e.target.value, name: "" },
              })
            }
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <Label>Description</Label>
          <Textarea
            value={product.description || ""}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
        </div>

        {/* Image Preview */}
        <div>
          <Label>Image</Label>
          {product.images?.[0]?.url ? (
            <Image
              src={product.images[0].url}
              alt="Product"
              className="w-32 h-32 object-cover rounded-md"
            />
          ) : (
            <p className="text-gray-500">No image available</p>
          )}
        </div>

        {/* Submit */}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Updating..." : "Update Product"}
        </Button>
      </form>
    </div>
  );
}
