"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

interface Category {
  _id: string;
  name: string;
}

export default function AddProductPage() {
    const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState<any>({
    name: "",
    price: "",
    unit: "kg",
    quantity: "",
    description: "",
    category: "",
    images: [] as File[],
  });

  // ✅ Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${baseUrl}/categories`);
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : data.categories || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // ✅ Add Product
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("unit", newProduct.unit);
      formData.append("quantity", newProduct.quantity || "0");
      formData.append("description", newProduct.description || "");
      formData.append("category", newProduct.category);

      newProduct.images.forEach((file: File) => {
        formData.append("images", file);
      });

      const res = await fetch(`${baseUrl}/products`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setNewProduct({
          name: "",
          price: "",
          unit: "kg",
          quantity: "",
          description: "",
          category: "",
          images: [],
        });
        toast.success("✅ Product added successfully!");
        setTimeout(() => router.push("/dashboard/products"), 1500);
      } else {
        console.error("Failed to add product");
        toast.error("❌ Failed to add product");
      }
    } catch (err) {
      console.error("Error adding product:", err);
      toast.error("❌ Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-6">Add New Product</h1>

      <div className="flex flex-col gap-4">
        <Input
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <Textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />
        <Input
          placeholder="Price"
          type="number"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <Input
          placeholder="Quantity"
          type="number"
          value={newProduct.quantity}
          onChange={(e) =>
            setNewProduct({ ...newProduct, quantity: e.target.value })
          }
        />

        {/* Unit Dropdown */}
        <Select
          value={newProduct.unit}
          onValueChange={(val) => setNewProduct({ ...newProduct, unit: val })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="kg">kg</SelectItem>
            <SelectItem value="pcs">pcs</SelectItem>
            <SelectItem value="ltr">ltr</SelectItem>
          </SelectContent>
        </Select>

        {/* Category Dropdown */}
        <Select
          value={newProduct.category}
          onValueChange={(val) => setNewProduct({ ...newProduct, category: val })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat._id} value={cat._id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Image Upload */}
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              images: e.target.files ? Array.from(e.target.files) : [],
            })
          }
        />

        <Button
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={handleAddProduct}
        >
          {loading ? "Saving..." : "Save Product"}
        </Button>
      </div>
    </div>
  );
}
