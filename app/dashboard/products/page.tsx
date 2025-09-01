"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Fresh Eggs",
      price: 3.5,
      stock: 120,
      category: "Food",
      status: "Active",
      image: "/products/eggs.jpg",
    },
    {
      id: 2,
      name: "Organic Chicken",
      price: 12.0,
      stock: 35,
      category: "Meat",
      status: "Active",
      image: "/products/chicken.jpg",
    },
    {
      id: 3,
      name: "Fresh Fish",
      price: 8.0,
      stock: 0,
      category: "Seafood",
      status: "Out of stock",
      image: "/products/fish.jpg",
    },
  ]);

  // Form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    status: "Active",
    image: "",
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.category) {
      alert("Please fill all required fields");
      return;
    }

    const product = {
      id: products.length + 1,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      category: newProduct.category,
      status: newProduct.status,
      image: newProduct.image || "/products/default.jpg",
    };

    setProducts([...products, product]);
    setNewProduct({
      name: "",
      price: "",
      stock: "",
      category: "",
      status: "Active",
      image: "",
    });
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>

        {/* Add Product Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white">
              <Plus className="w-4 h-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Name */}
              <div>
                <Label>Product Name</Label>
                <Input
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="Enter product name"
                />
              </div>

              {/* Price */}
              <div>
                <Label>Price ($)</Label>
                <Input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  placeholder="Enter price"
                />
              </div>

              {/* Stock */}
              <div>
                <Label>Stock</Label>
                <Input
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  placeholder="Enter stock quantity"
                />
              </div>

              {/* Category */}
              <div>
                <Label>Category</Label>
                <Select
                  value={newProduct.category}
                  onValueChange={(val) => setNewProduct({ ...newProduct, category: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Meat">Meat</SelectItem>
                    <SelectItem value="Seafood">Seafood</SelectItem>
                    <SelectItem value="Vegetables">Vegetables</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status */}
              <div>
                <Label>Status</Label>
                <Select
                  value={newProduct.status}
                  onValueChange={(val) => setNewProduct({ ...newProduct, status: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Out of stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Image */}
              <div>
                <Label>Product Image</Label>
                <Input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setNewProduct({ ...newProduct, image: URL.createObjectURL(e.target.files[0]) });
                    }
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={handleAddProduct}
              >
                Save Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Product Table */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Product List</CardTitle>
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    {product.status === "Active" ? (
                      <Badge className="bg-green-100 text-green-700">Active</Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-700">Out of Stock</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="icon" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredProducts.length === 0 && (
            <p className="text-center text-gray-500 py-6">No products found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
