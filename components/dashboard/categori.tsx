"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

const baseUrl = process.env.NEXT_PUBLIC_API || "";

type Props = {
  onSuccess: () => void;
};

export default function CategoryForm({ onSuccess }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const handleSubmit = async () => {
    if (!name.trim() || !slug.trim()) return toast.error("Both name and slug are required");

    try {
      const res = await fetch(`${baseUrl}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug }),
      });

      if (!res.ok) throw new Error("Failed");

      toast.success("Category added");
      setName("");
      setSlug("");
      setOpen(false);
      onSuccess();
    } catch (error) {
        console.log(error);
        
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Category slug (unique)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
          <Button onClick={handleSubmit}>Add</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
