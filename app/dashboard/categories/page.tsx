"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import CategoryForm from "@/components/dashboard/categori";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

type Category = {
  _id: string;
  name: string;
  slug: string;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${baseUrl}/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (error) {
        console.log(error);
        
      toast.error("Failed to fetch categories");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure to delete this category?")) return;
    try {
      await fetch(`${baseUrl}/categories/${id}`, { method: "DELETE" });
      toast.success("Category deleted");
      fetchCategories();
    } catch {
      toast.error("Failed to delete");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Categories</h1>
        <CategoryForm onSuccess={fetchCategories} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((cat) => (
            <TableRow key={cat._id}>
              <TableCell>{cat.name}</TableCell>
              <TableCell>{cat.slug}</TableCell>
              <TableCell className="flex gap-2">
                <Button variant="destructive" onClick={() => handleDelete(cat._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
